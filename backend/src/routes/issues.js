const express = require('express');
const {
    createIssue,
    getIssues,
    updateIssue,
    deleteIssue,
    getIssueById,
    getIssuesGroupedByUser,
    getActivityByIssueId,
} = require('../controllers/issueController');
const { protect } = require('../middleware/auth');
const { requireAdmin } = require('../middleware/roleAuth');
const { authorizeIssueOwner } = require('../middleware/authorization');
const { createLimiter } = require('../middleware/rateLimiter');
const {
    validateCreateIssue,
    validateUpdateIssue,
    handleValidationErrors
} = require('../validators/issueValidator');

const router = express.Router();

// Admin routes
router.get('/admin/users', protect, requireAdmin, getIssuesGroupedByUser);

router.route('/')
    .get(protect, getIssues)
    .post(protect, createLimiter, validateCreateIssue, handleValidationErrors, createIssue);

router.route('/:id')
    .get(protect, getIssueById)
    .put(protect, authorizeIssueOwner, validateUpdateIssue, handleValidationErrors, updateIssue)
    .delete(protect, authorizeIssueOwner, deleteIssue);

router.get('/:id/activity', protect, getActivityByIssueId);

module.exports = router;
