import React from 'react';
import { twMerge } from 'tailwind-merge';

const Select = ({ className, label, error, options, ...props }) => {
    return (
        <div className="w-full animate-reveal">
            {label && (
                <label className="block text-sm font-bold text-slate-600 dark:text-slate-400 mb-2 ml-1 uppercase tracking-wider">
                    {label}
                </label>
            )}
            <div className="relative group">
                <select
                    className={twMerge(
                        'w-full px-5 py-3 rounded-2xl border border-slate-200 bg-white/50 backdrop-blur-sm text-slate-900 focus:outline-none focus:ring-4 focus:ring-accent/10 transition-all appearance-none dark:bg-slate-900/50 dark:border-slate-800 dark:text-white cursor-pointer',
                        error && 'border-red-400 focus:ring-red-100',
                        className
                    )}
                    {...props}
                >
                    {options.map((option) => (
                        <option key={option.value} value={option.value} className="bg-white dark:bg-slate-900">
                            {option.label}
                        </option>
                    ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 transition-transform group-hover:translate-y-[-40%]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                </div>
            </div>
            {error && <p className="mt-2 text-xs font-bold text-red-500 ml-1">{error}</p>}
        </div>
    );
};


export default Select;