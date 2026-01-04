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
                    'w-full px-5 py-3 rounded-2xl border border-slate-200 bg-white/50 backdrop-blur-sm text-slate-900 focus:outline-none focus:ring-4 focus:ring-accent/10 transition-all dark:bg-slate-900/50 dark:border-slate-800 dark:text-white placeholder:text-slate-400',
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