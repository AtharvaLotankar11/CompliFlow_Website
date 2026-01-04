const Issue = require('../models/Issue');
const Activity = require('../models/Activity');
const Groq = require('groq-sdk');

// @desc    Create a new issue
// @route   POST /api/issues
// @access  Private
const createIssue = async (req, res) => {
    try {
        const { title, description, category, priority } = req.body;

        // AI Triage Integration
        let aiTriage = null;
        if (process.env.GROQ_API_KEY) {
            try {
                const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
                const prompt = `Analyze this complaint:
                Title: ${title}
                Description: ${description}
                
                Provide a JSON response with:
                1. sentiment: (e.g., Frustrated, Urgent, Neutral, Satisfied)
                2. suggestedPriority: (low, medium, high, critical)
                3. suggestedCategory: (bug, facility, request, other)
                4. explanation: a short 1-sentence reason for your triage
                5. tags: 3-5 relevant keywords
                
                Return ONLY valid JSON.`;

                const completion = await groq.chat.completions.create({
                    messages: [{ role: 'user', content: prompt }],
                    model: 'llama-3.1-8b-instant', // Faster model for triage
                    response_format: { type: 'json_object' }
                });

                aiTriage = JSON.parse(completion.choices[0].message.content);
            } catch (aiError) {
                console.error('AI Triage failed:', aiError);
            }
        }

        const issue = await Issue.create({
            title,
            description,
            category,
            priority,
            createdBy: req.user._id,
            aiTriage
        });

        // Log Activity
        await Activity.create({
            issue: issue._id,
            user: req.user._id,
            action: 'created',
            details: { message: `Issue created with priority ${priority}` }
        });

        res.status(201).json(issue);
    } catch (error) {
        console.error('Create Issue Error:', error);
        res.status(400).json({ message: 'Invalid issue data' });
    }
};

// @desc    Get all issues for current user
// @route   GET /api/issues
// @access  Private
const getIssues = async (req, res) => {
    try {
        const { status, priority, search, page = 1, limit = 10 } = req.query;
        const query = {
            isDeleted: false,
            createdBy: req.user._id  // Only show issues created by current user
        };

        // Add filters
        if (status) query.status = status;
        if (priority) query.priority = priority;
        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ];
        }

        // Calculate pagination
        const pageNum = parseInt(page, 10);
        const limitNum = parseInt(limit, 10);
        const skip = (pageNum - 1) * limitNum;

        // Get total count for pagination info (with user filter)
        const total = await Issue.countDocuments(query);

        // Get issues with pagination
        const issues = await Issue.find(query)
            .populate('createdBy', 'name email')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limitNum);

        // Calculate pagination info
        const totalPages = Math.ceil(total / limitNum);
        const hasNextPage = pageNum < totalPages;
        const hasPrevPage = pageNum > 1;

        res.json({
            issues,
            pagination: {
                currentPage: pageNum,
                totalPages,
                totalItems: total,
                itemsPerPage: limitNum,
                hasNextPage,
                hasPrevPage
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error while fetching issues' });
    }
};

// @desc    Update an issue
// @route   PUT /api/issues/:id
// @access  Private (Owner or Admin)
const updateIssue = async (req, res) => {
    try {
        // Issue is already attached by authorization middleware
        const issue = req.issue;

        const oldStatus = issue.status;
        const oldPriority = issue.priority;

        // Only allow status updates for non-owners (admins)
        if (req.user._id.toString() !== issue.createdBy.toString()) {
            // Non-owner (admin) can only update status
            if (req.body.title || req.body.description || req.body.category || req.body.priority) {
                return res.status(403).json({
                    message: 'Admins can only update issue status, not content'
                });
            }
            issue.status = req.body.status || issue.status;
        } else {
            // Owner can update everything except status (unless admin)
            if (req.user.role !== 'admin' && req.body.status) {
                return res.status(403).json({
                    message: 'Users cannot update issue status'
                });
            }
            issue.title = req.body.title || issue.title;
            issue.description = req.body.description || issue.description;
            issue.category = req.body.category || issue.category;
            issue.priority = req.body.priority || issue.priority;
            if (req.user.role === 'admin') {
                issue.status = req.body.status || issue.status;
            }
        }

        const updatedIssue = await issue.save();

        // Log Activity for status change
        if (oldStatus !== updatedIssue.status) {
            await Activity.create({
                issue: updatedIssue._id,
                user: req.user._id,
                action: 'status_updated',
                details: { from: oldStatus, to: updatedIssue.status }
            });
        }

        // Log Activity for priority change
        if (oldPriority !== updatedIssue.priority) {
            await Activity.create({
                issue: updatedIssue._id,
                user: req.user._id,
                action: 'priority_updated',
                details: { from: oldPriority, to: updatedIssue.priority }
            });
        }

        res.json(updatedIssue);
    } catch (error) {
        res.status(500).json({ message: 'Server error while updating issue' });
    }
};

// @desc    Soft delete an issue
// @route   DELETE /api/issues/:id
// @access  Private (Owner only)
const deleteIssue = async (req, res) => {
    try {
        // Issue is already attached by authorization middleware
        const issue = req.issue;

        issue.isDeleted = true;
        await issue.save();

        // Log Activity
        await Activity.create({
            issue: issue._id,
            user: req.user._id,
            action: 'deleted'
        });

        res.json({ message: 'Issue removed (soft deleted)' });
    } catch (error) {
        res.status(500).json({ message: 'Server error while deleting issue' });
    }
};

// @desc    Get single issue
// @route   GET /api/issues/:id
// @access  Private (Owner or Admin)
const getIssueById = async (req, res) => {
    const issue = await Issue.findById(req.params.id).populate('createdBy', 'name email');

    if (!issue || issue.isDeleted) {
        return res.status(404).json({ message: 'Issue not found' });
    }

    // Check if user owns the issue or is admin
    if (issue.createdBy._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
        return res.status(403).json({
            message: 'Access denied. You can only view your own issues.'
        });
    }

    res.json(issue);
};

// @desc    Get all issues with user grouping for admin
// @route   GET /api/issues/admin/users
// @access  Private (Admin only)
const getIssuesGroupedByUser = async (req, res) => {
    try {
        const { status, priority, search } = req.query;
        const query = { isDeleted: false };

        // Add filters
        if (status) query.status = status;
        if (priority) query.priority = priority;
        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ];
        }

        // Get issues with user population
        const issues = await Issue.find(query)
            .populate('createdBy', 'name email')
            .sort({ createdAt: -1 });

        // Group by user
        const userGroups = issues.reduce((acc, issue) => {
            const userId = issue.createdBy?._id?.toString() || 'anonymous';
            if (!acc[userId]) {
                acc[userId] = {
                    user: issue.createdBy,
                    issues: [],
                    stats: {
                        total: 0,
                        open: 0,
                        in_progress: 0,
                        resolved: 0,
                        closed: 0,
                        critical: 0,
                        high: 0,
                        medium: 0,
                        low: 0
                    }
                };
            }
            acc[userId].issues.push(issue);
            acc[userId].stats.total++;
            acc[userId].stats[issue.status]++;
            acc[userId].stats[issue.priority]++;
            return acc;
        }, {});

        res.json({
            userGroups,
            totalUsers: Object.keys(userGroups).length,
            totalIssues: issues.length
        });
    } catch (error) {
        console.error('Error in getIssuesGroupedByUser:', error);
        res.status(500).json({ message: 'Server error while fetching user issues' });
    }
};

const getActivityByIssueId = async (req, res) => {
    try {
        const activities = await Activity.find({ issue: req.params.id })
            .populate('user', 'name role')
            .sort({ createdAt: -1 });
        res.json(activities);
    } catch (error) {
        res.status(500).json({ message: 'Server error while fetching activity' });
    }
};

module.exports = {
    createIssue,
    getIssues,
    updateIssue,
    deleteIssue,
    getIssueById,
    getIssuesGroupedByUser,
    getActivityByIssueId,
};
