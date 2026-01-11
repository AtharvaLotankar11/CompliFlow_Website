import React from 'react';
import { ISSUE_STATUS, ISSUE_PRIORITY } from '../constants/issue';

const Sidebar = ({ filters, onFilterChange }) => {
    return (
        <aside className="w-full lg:w-72 space-y-8">
            <div className="glass p-8 rounded-3xl border border-white/40 shadow-xl">
                <h3 className="text-sm font-heading font-bold text-slate-500 uppercase tracking-widest mb-8 border-b border-slate-100 dark:border-slate-800 pb-3">
                    Filters
                </h3>

                <div className="space-y-8">
                    <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 ml-1">
                            Status
                        </label>
                        <div className="relative group">
                            <select
                                value={filters.status}
                                onChange={(e) => onFilterChange('status', e.target.value)}
                                className="input-premium appearance-none py-3"
                            >
                                <option value="">All Statuses</option>
                                {Object.entries(ISSUE_STATUS).map(([key, value]) => (
                                    <option key={key} value={value}>
                                        {value.charAt(0).toUpperCase() + value.slice(1).replace('_', ' ')}
                                    </option>
                                ))}
                            </select>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 transition-transform group-hover:translate-y-[-40%]">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 ml-1">
                            Priority
                        </label>
                        <div className="relative group">
                            <select
                                value={filters.priority}
                                onChange={(e) => onFilterChange('priority', e.target.value)}
                                className="input-premium appearance-none py-3"
                            >
                                <option value="">All Priorities</option>
                                {Object.entries(ISSUE_PRIORITY).map(([key, value]) => (
                                    <option key={key} value={value}>
                                        {value.charAt(0).toUpperCase() + value.slice(1)}
                                    </option>
                                ))}
                            </select>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 transition-transform group-hover:translate-y-[-40%]">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </aside>

    );
};

export default Sidebar;
