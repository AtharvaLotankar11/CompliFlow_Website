import React from 'react';
import { twMerge } from 'tailwind-merge';

const Select = ({ className, label, error, options, ...props }) => {
    return (
        <div className="w-full">
            {label && (
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {label}
                </label>
            )}
            <select
                className={twMerge(
                    'w-full px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all dark:bg-slate-800 dark:border-slate-700 dark:text-gray-100',
                    error && 'border-red-500 focus:ring-red-500',
                    className
                )}
                {...props}
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
        </div>
    );
};

export default Select;