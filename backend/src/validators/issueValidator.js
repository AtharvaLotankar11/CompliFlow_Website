const { body, validationResult } = require('express-validator');

const validateCreateIssue = [
    body('title')
        .trim()
        .isLength({ min: 3, max: 100 })
        .withMessage('Title must be between 3 and 100 characters'),
    body('description')
        .trim()
        .isLength({ min: 10, max: 1000 })
        .withMessage('Description must be between 10 and 1000 characters'),
    body('category')
        .isIn(['bug', 'facility', 'request', 'other'])
        .withMessage('Category must be one of: bug, facility, request, other'),
    body('priority')
        .optional()
        .isIn(['low', 'medium', 'high', 'critical'])
        .withMessage('Priority must be one of: low, medium, high, critical'),
];

const validateUpdateIssue = [
    body('title')
        .optional()
        .trim()
        .isLength({ min: 3, max: 100 })
        .withMessage('Title must be between 3 and 100 characters'),
    body('description')
        .optional()
        .trim()
        .isLength({ min: 10, max: 1000 })
        .withMessage('Description must be between 10 and 1000 characters'),
    body('category')
        .optional()
        .isIn(['bug', 'facility', 'request', 'other'])
        .withMessage('Category must be one of: bug, facility, request, other'),
    body('priority')
        .optional()
        .isIn(['low', 'medium', 'high', 'critical'])
        .withMessage('Priority must be one of: low, medium, high, critical'),
    body('status')
        .optional()
        .isIn(['open', 'in_progress', 'resolved', 'closed'])
        .withMessage('Status must be one of: open, in_progress, resolved, closed'),
];

const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            message: 'Validation failed',
            errors: errors.array()
        });
    }
    next();
};

module.exports = {
    validateCreateIssue,
    validateUpdateIssue,
    handleValidationErrors
};