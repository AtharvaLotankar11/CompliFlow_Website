import React from 'react';
import Card from '../../../components/Card';
import StatusBadge from './StatusBadge';
import { PRIORITY_COLORS } from '../../../constants/issue';
import { CalendarIcon, UserIcon, TrashIcon, PencilIcon, CogIcon } from '@heroicons/react/24/outline';

const IssueCard = ({ issue, onEdit, onDelete, userRole, currentUserId }) => {
    const priorityColor = PRIORITY_COLORS[issue.priority] || 'text-gray-500';
    const isOwner = currentUserId === issue.createdBy?._id;
    const isAdmin = userRole === 'admin';

    return (
        <Card className="hover:shadow-indigo-500/10 hover:border-indigo-500/30">
            <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 line-clamp-1">
                    {issue.title}
                </h3>
                <div className="flex items-center gap-2">
                    <StatusBadge status={issue.status} />
                    {isAdmin && !isOwner && (
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                            Admin View
                        </span>
                    )}
                </div>
            </div>

            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-4">
                {issue.description}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 dark:text-gray-500 mb-6">
                <div className="flex items-center gap-1">
                    <CalendarIcon className="h-4 w-4" />
                    {new Date(issue.createdAt).toLocaleDateString()}
                </div>
                <div className="flex items-center gap-1">
                    <span className={`font-bold uppercase ${priorityColor}`}>
                        {issue.priority}
                    </span>
                </div>
                <div className="flex items-center gap-1">
                    <UserIcon className="h-4 w-4" />
                    {issue.createdBy?.name || 'Anonymous'}
                </div>
            </div>

            <div className="flex justify-end gap-2 border-t border-gray-100 dark:border-slate-700 pt-4 mt-auto">
                {/* Users can edit their own issues, Admins can edit any issue */}
                {(isOwner || isAdmin) && (
                    <button
                        onClick={() => onEdit(issue)}
                        className="p-2 text-indigo-600 hover:bg-indigo-50 dark:text-indigo-400 dark:hover:bg-slate-800 rounded-lg transition-colors"
                        title={isAdmin && !isOwner ? "Edit Status (Admin)" : "Edit Issue"}
                    >
                        {isAdmin && !isOwner ? <CogIcon className="h-5 w-5" /> : <PencilIcon className="h-5 w-5" />}
                    </button>
                )}
                
                {/* Only owners can delete their issues */}
                {isOwner && (
                    <button
                        onClick={() => onDelete(issue._id)}
                        className="p-2 text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-slate-800 rounded-lg transition-colors"
                        title="Delete Issue"
                    >
                        <TrashIcon className="h-5 w-5" />
                    </button>
                )}
            </div>
        </Card>
    );
};

export default IssueCard;
