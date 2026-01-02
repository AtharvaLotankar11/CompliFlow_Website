const ISSUE_CATEGORIES = {
    BUG: 'bug',
    FACILITY: 'facility',
    REQUEST: 'request',
    OTHER: 'other'
};

const ISSUE_PRIORITIES = {
    LOW: 'low',
    MEDIUM: 'medium',
    HIGH: 'high',
    CRITICAL: 'critical'
};

const ISSUE_STATUSES = {
    OPEN: 'open',
    IN_PROGRESS: 'in_progress',
    RESOLVED: 'resolved',
    CLOSED: 'closed'
};

const HTTP_STATUS = {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500
};

module.exports = {
    ISSUE_CATEGORIES,
    ISSUE_PRIORITIES,
    ISSUE_STATUSES,
    HTTP_STATUS
};