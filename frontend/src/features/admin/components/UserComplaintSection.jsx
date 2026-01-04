import React, { useState } from 'react';
import {
    UserCircleIcon,
    ChevronDownIcon,
    ChevronUpIcon,
    ExclamationTriangleIcon,
    CheckCircleIcon,
    ClockIcon,
    XCircleIcon
} from '@heroicons/react/24/outline';
import StatusBadge from '../../issues/components/StatusBadge';
import IssueTimeline from '../../issues/components/IssueTimeline';
import { Sparkles, Tag, Smile } from 'lucide-react';
import { PRIORITY_COLORS } from '../../../constants/issue';

const UserComplaintSection = ({ user, issues, onStatusUpdate, isUpdating }) => {
    const [isExpanded, setIsExpanded] = useState(true);

    const getStatusIcon = (status) => {
        switch (status) {
            case 'open':
                return <ExclamationTriangleIcon className="h-5 w-5 text-blue-500" />;
            case 'in_progress':
                return <ClockIcon className="h-5 w-5 text-yellow-500" />;
            case 'resolved':
                return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
            case 'closed':
                return <XCircleIcon className="h-5 w-5 text-gray-500" />;
            default:
                return <ExclamationTriangleIcon className="h-5 w-5 text-gray-500" />;
        }
    };

    const getStatusCount = (status) => {
        return issues.filter(issue => issue.status === status).length;
    };

    const statusCounts = {
        open: getStatusCount('open'),
        in_progress: getStatusCount('in_progress'),
        resolved: getStatusCount('resolved'),
        closed: getStatusCount('closed')
    };

    const totalIssues = issues.length;
    const activeIssues = statusCounts.open + statusCounts.in_progress;

    return (
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-800 shadow-sm overflow-hidden">
            {/* User Header */}
            <div
                className="p-6 border-b border-gray-200 dark:border-slate-800 cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors"
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                            {user?.name ? (
                                <span className="text-white font-semibold text-lg">
                                    {user.name.charAt(0).toUpperCase()}
                                </span>
                            ) : (
                                <UserCircleIcon className="h-8 w-8 text-white" />
                            )}
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                                {user?.name || 'Anonymous User'}
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                {user?.email || 'No email provided'}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        {/* Status Summary */}
                        <div className="hidden md:flex items-center gap-4 text-sm">
                            <div className="flex items-center gap-1">
                                <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                                <span className="text-gray-600 dark:text-gray-400">
                                    {activeIssues} Active
                                </span>
                            </div>
                            <div className="flex items-center gap-1">
                                <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                                <span className="text-gray-600 dark:text-gray-400">
                                    {statusCounts.resolved + statusCounts.closed} Resolved
                                </span>
                            </div>
                            <div className="text-gray-500 dark:text-gray-400">
                                Total: {totalIssues}
                            </div>
                        </div>

                        {/* Expand/Collapse Icon */}
                        {isExpanded ? (
                            <ChevronUpIcon className="h-5 w-5 text-gray-400" />
                        ) : (
                            <ChevronDownIcon className="h-5 w-5 text-gray-400" />
                        )}
                    </div>
                </div>

                {/* Mobile Status Summary */}
                <div className="md:hidden mt-4 flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                        <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                        <span className="text-gray-600 dark:text-gray-400">
                            {activeIssues} Active
                        </span>
                    </div>
                    <div className="flex items-center gap-1">
                        <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                        <span className="text-gray-600 dark:text-gray-400">
                            {statusCounts.resolved + statusCounts.closed} Resolved
                        </span>
                    </div>
                    <div className="text-gray-500 dark:text-gray-400">
                        Total: {totalIssues}
                    </div>
                </div>
            </div>

            {/* Issues List */}
            {isExpanded && (
                <div className="p-6">
                    <div className="space-y-4">
                        {issues.map((issue) => (
                            <div
                                key={issue._id}
                                className="border border-gray-200 dark:border-slate-700 rounded-lg p-4 hover:border-indigo-300 dark:hover:border-indigo-600 transition-colors"
                            >
                                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                                    <div className="flex-1">
                                        <div className="flex items-start gap-3 mb-2">
                                            {getStatusIcon(issue.status)}
                                            <div className="flex-1">
                                                <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-1">
                                                    {issue.title}
                                                </h4>
                                                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                                                    {issue.description}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                                            <span className="flex items-center gap-1">
                                                <span className={`font-bold uppercase ${PRIORITY_COLORS[issue.priority]}`}>
                                                    {issue.priority}
                                                </span>
                                            </span>
                                            <span>
                                                {issue.category ? (issue.category.charAt(0).toUpperCase() + issue.category.slice(1)) : 'Other'}
                                            </span>
                                            <span>
                                                {new Date(issue.createdAt).toLocaleDateString()}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <StatusBadge status={issue.status} />
                                        <select
                                            value={issue.status}
                                            onChange={(e) => onStatusUpdate(issue._id, e.target.value)}
                                            disabled={isUpdating}
                                            className="px-3 py-1 text-sm rounded-md border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 outline-none disabled:opacity-50"
                                        >
                                            <option value="open">Open</option>
                                            <option value="in_progress">In Progress</option>
                                            <option value="resolved">Resolved</option>
                                            <option value="closed">Closed</option>
                                        </select>
                                    </div>
                                </div>

                                {/* AI Triage & Timeline Extension */}
                                <div className="mt-4 pt-4 border-t border-gray-100 dark:border-slate-800">
                                    {issue.aiTriage && (
                                        <div className="mb-4 bg-indigo-50/50 dark:bg-indigo-900/10 p-3 rounded-lg border border-indigo-100 dark:border-indigo-900/30">
                                            <div className="flex items-center gap-2 mb-2">
                                                <Sparkles size={14} className="text-indigo-600" />
                                                <span className="text-xs font-bold text-indigo-900 dark:text-indigo-300 uppercase tracking-wider">AI Insights</span>
                                            </div>
                                            <div className="flex flex-wrap gap-4 text-xs">
                                                <div className="flex items-center gap-1.5 text-gray-700 dark:text-gray-300">
                                                    <Smile size={14} className="text-gray-400" />
                                                    <span className="font-medium">Sentiment:</span>
                                                    <span className="capitalize">{issue.aiTriage.sentiment}</span>
                                                </div>
                                                <div className="flex items-center gap-1.5 text-gray-700 dark:text-gray-300">
                                                    <Tag size={14} className="text-gray-400" />
                                                    <span className="font-medium">Tags:</span>
                                                    <div className="flex gap-1">
                                                        {issue.aiTriage.tags?.map(tag => (
                                                            <span key={tag} className="bg-white dark:bg-slate-800 px-1.5 py-0.5 rounded border border-gray-200 dark:border-slate-700">{tag}</span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                            {issue.aiTriage.explanation && (
                                                <p className="mt-2 text-xs text-gray-500 dark:text-gray-400 italic">
                                                    "{issue.aiTriage.explanation}"
                                                </p>
                                            )}
                                        </div>
                                    )}

                                    {/* Collapsible Timeline */}
                                    <details className="group">
                                        <summary className="text-xs font-semibold text-gray-500 hover:text-indigo-600 cursor-pointer list-none flex items-center gap-1">
                                            <span className="group-open:rotate-180 transition-transform">▼</span>
                                            View Activity History
                                        </summary>
                                        <IssueTimeline issueId={issue._id} />
                                    </details>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserComplaintSection;