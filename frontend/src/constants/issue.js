export const ISSUE_STATUS = {
    OPEN: 'open',
    IN_PROGRESS: 'in_progress',
    RESOLVED: 'resolved',
    CLOSED: 'closed',
};

export const ISSUE_PRIORITY = {
    LOW: 'low',
    MEDIUM: 'medium',
    HIGH: 'high',
    CRITICAL: 'critical',
};

export const ISSUE_CATEGORY = {
    BUG: 'bug',
    FACILITY: 'facility',
    REQUEST: 'request',
    OTHER: 'other',
};

export const STATUS_COLORS = {
    [ISSUE_STATUS.OPEN]: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    [ISSUE_STATUS.IN_PROGRESS]: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
    [ISSUE_STATUS.RESOLVED]: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    [ISSUE_STATUS.CLOSED]: 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400',
};

export const PRIORITY_COLORS = {
    [ISSUE_PRIORITY.LOW]: 'text-gray-500',
    [ISSUE_PRIORITY.MEDIUM]: 'text-blue-500',
    [ISSUE_PRIORITY.HIGH]: 'text-orange-500',
    [ISSUE_PRIORITY.CRITICAL]: 'text-red-500 font-bold',
};
