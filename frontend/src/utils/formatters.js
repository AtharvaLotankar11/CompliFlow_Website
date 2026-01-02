// Utility functions for formatting data

export const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
};

export const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
};

export const formatRelativeTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)}d ago`;
    
    return formatDate(dateString);
};

export const capitalizeFirst = (str) => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
};

export const formatPriority = (priority) => {
    const priorityMap = {
        low: 'Low',
        medium: 'Medium',
        high: 'High',
        critical: 'Critical'
    };
    return priorityMap[priority] || priority;
};

export const formatStatus = (status) => {
    const statusMap = {
        open: 'Open',
        in_progress: 'In Progress',
        resolved: 'Resolved',
        closed: 'Closed'
    };
    return statusMap[status] || status;
};

export const formatCategory = (category) => {
    const categoryMap = {
        bug: 'Bug',
        facility: 'Facility',
        request: 'Request',
        other: 'Other'
    };
    return categoryMap[category] || category;
};