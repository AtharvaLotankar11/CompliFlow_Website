import React from 'react';
import { ISSUE_STATUS, ISSUE_PRIORITY } from '../constants/issue';

const Sidebar = ({ filters, onFilterChange }) => {
    return (
        <aside className="w-full lg:w-64 space-y-6">
            <div>
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
                    Filters
                </h3>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Status
                        </label>
                        <select
                            value={filters.status}
                            onChange={(e) => onFilterChange('status', e.target.value)}
                            className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                        >
                            <option value="">All Statuses</option>
                            {Object.entries(ISSUE_STATUS).map(([key, value]) => (
                                <option key={key} value={value}>
                                    {value.charAt(0).toUpperCase() + value.slice(1).replace('_', ' ')}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Priority
                        </label>
                        <select
                            value={filters.priority}
                            onChange={(e) => onFilterChange('priority', e.target.value)}
                            className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                        >
                            <option value="">All Priorities</option>
                            {Object.entries(ISSUE_PRIORITY).map(([key, value]) => (
                                <option key={key} value={value}>
                                    {value.charAt(0).toUpperCase() + value.slice(1)}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;