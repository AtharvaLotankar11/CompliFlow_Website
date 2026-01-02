import React from 'react';
import Badge from '../../../components/Badge';
import { STATUS_COLORS } from '../../../constants/issue';

const StatusBadge = ({ status }) => {
    const colorMap = {
        open: 'blue',
        in_progress: 'yellow',
        resolved: 'green',
        closed: 'gray',
    };

    return (
        <Badge color={colorMap[status] || 'gray'}>
            {status.replace('_', ' ').charAt(0).toUpperCase() + status.slice(1).replace('_', ' ')}
        </Badge>
    );
};

export default StatusBadge;
