const Issue = require('../models/Issue');

// Check if user owns the issue or is admin
const authorizeIssueOwner = async (req, res, next) => {
    try {
        const issue = await Issue.findById(req.params.id);
        
        if (!issue) {
            return res.status(404).json({ message: 'Issue not found' });
        }

        if (issue.isDeleted) {
            return res.status(404).json({ message: 'Issue not found' });
        }

        // Allow access if user owns the issue OR is admin
        if (issue.createdBy.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return res.status(403).json({ 
                message: 'Access denied. You can only modify your own issues.' 
            });
        }

        // Attach issue to request for use in controller
        req.issue = issue;
        next();
    } catch (error) {
        res.status(500).json({ message: 'Server error during authorization check' });
    }
};

module.exports = {
    authorizeIssueOwner
};