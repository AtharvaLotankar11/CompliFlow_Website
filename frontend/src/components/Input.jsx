import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const Input = ({ className, label, error, ...props }) => {
    return (
        <div className="w-full animate-reveal">
            {label && (
                <label className="block text-sm font-bold text-slate-600 dark:text-slate-400 mb-2 ml-1 uppercase tracking-wider">
                    {label}
                </label>
            )}
            <input
                className={twMerge(
                    'input-premium',
                    error && 'border-red-400 focus:ring-red-100',
                    className
                )}
                {...props}
            />
            {error && <p className="mt-2 text-xs font-bold text-red-500 ml-1">{error}</p>}
        </div>
    );
};


export default Input;