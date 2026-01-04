import React from 'react';
import {
    UserGroupIcon,
    ExclamationTriangleIcon,
    CheckCircleIcon,
    ClockIcon,
    ChartBarIcon
} from '@heroicons/react/24/outline';

const AdminStats = ({ totalUsers, totalIssues, issuesData }) => {
    const getStatusCount = (status) => {
        return (issuesData || []).filter(issue => issue.status === status).length;
    };

    const getPriorityCount = (priority) => {
        return (issuesData || []).filter(issue => issue.priority === priority).length;
    };

    const stats = [
        {
            name: 'Total Users',
            value: totalUsers,
            icon: UserGroupIcon,
            color: 'text-blue-600 dark:text-blue-400',
            bgColor: 'bg-blue-100 dark:bg-blue-900/30'
        },
        {
            name: 'Total Issues',
            value: totalIssues,
            icon: ChartBarIcon,
            color: 'text-purple-600 dark:text-purple-400',
            bgColor: 'bg-purple-100 dark:bg-purple-900/30'
        },
        {
            name: 'Open Issues',
            value: getStatusCount('open'),
            icon: ExclamationTriangleIcon,
            color: 'text-red-600 dark:text-red-400',
            bgColor: 'bg-red-100 dark:bg-red-900/30'
        },
        {
            name: 'In Progress',
            value: getStatusCount('in_progress'),
            icon: ClockIcon,
            color: 'text-yellow-600 dark:text-yellow-400',
            bgColor: 'bg-yellow-100 dark:bg-yellow-900/30'
        },
        {
            name: 'Resolved',
            value: getStatusCount('resolved') + getStatusCount('closed'),
            icon: CheckCircleIcon,
            color: 'text-green-600 dark:text-green-400',
            bgColor: 'bg-green-100 dark:bg-green-900/30'
        }
    ];

    const priorityStats = [
        { name: 'Critical', value: getPriorityCount('critical'), color: 'bg-red-500' },
        { name: 'High', value: getPriorityCount('high'), color: 'bg-orange-500' },
        { name: 'Medium', value: getPriorityCount('medium'), color: 'bg-blue-500' },
        { name: 'Low', value: getPriorityCount('low'), color: 'bg-gray-500' }
    ];

    return (
        <div className="mb-8">
            {/* Main Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-6">
                {stats.map((stat) => {
                    const Icon = stat.icon;
                    return (
                        <div key={stat.name} className="bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-800 p-6">
                            <div className="flex items-center">
                                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                                    <Icon className={`h-6 w-6 ${stat.color}`} />
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                        {stat.name}
                                    </p>
                                    <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                                        {stat.value}
                                    </p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Priority Breakdown */}
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-800 p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                    Priority Breakdown
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {priorityStats.map((priority) => (
                        <div key={priority.name} className="text-center">
                            <div className={`w-12 h-12 ${priority.color} rounded-full flex items-center justify-center mx-auto mb-2`}>
                                <span className="text-white font-bold text-lg">{priority.value}</span>
                            </div>
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                {priority.name}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdminStats;