import React from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import { Clock, User, CheckCircle, AlertCircle, Trash2, Edit } from 'lucide-react';

const IssueTimeline = ({ issueId }) => {
    const { data: activities, isLoading } = useQuery(
        ['issue-activity', issueId],
        async () => {
            const response = await axios.get(`/api/issues/${issueId}/activity`, { withCredentials: true });
            return response.data;
        }
    );

    const getIcon = (action) => {
        switch (action) {
            case 'created': return <AlertCircle size={16} className="text-blue-500" />;
            case 'status_updated': return <CheckCircle size={16} className="text-green-500" />;
            case 'priority_updated': return <Clock size={16} className="text-orange-500" />;
            case 'deleted': return <Trash2 size={16} className="text-red-500" />;
            default: return <Edit size={16} className="text-gray-500" />;
        }
    };

    if (isLoading) return <div className="animate-pulse h-40 bg-gray-50 rounded-xl" />;

    return (
        <div className="mt-6">
            <h4 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Clock size={16} />
                Activity History
            </h4>
            <div className="relative space-y-6 before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
                {activities?.map((activity, idx) => (
                    <div key={activity._id} className="relative flex items-start gap-4 animate-fade-in-up" style={{ animationDelay: `${idx * 100}ms` }}>
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white border border-gray-200 shadow-sm z-10">
                            {getIcon(activity.action)}
                        </div>
                        <div className="flex flex-col">
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-semibold text-gray-900">{activity.user.name}</span>
                                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full capitalize">{activity.user.role}</span>
                                <span className="text-xs text-gray-400">
                                    {new Date(activity.createdAt).toLocaleString()}
                                </span>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">
                                {activity.action === 'status_updated' ? (
                                    <>Changed status from <span className="font-medium">{activity.details.from}</span> to <span className="font-medium text-indigo-600">{activity.details.to}</span></>
                                ) : activity.action === 'priority_updated' ? (
                                    <>Changed priority from <span className="font-medium">{activity.details.from}</span> to <span className="font-medium text-orange-600">{activity.details.to}</span></>
                                ) : (
                                    activity.details?.message || activity.action.replace('_', ' ')
                                )}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default IssueTimeline;
