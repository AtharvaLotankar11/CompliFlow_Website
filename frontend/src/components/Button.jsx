import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const Button = ({ className, variant = 'primary', size = 'md', children, ...props }) => {
    const variants = {
        primary: 'bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700',
        secondary: 'bg-white text-gray-900 border border-gray-300 hover:bg-gray-50 dark:bg-slate-800 dark:text-gray-100 dark:border-slate-700 dark:hover:bg-slate-700',
        danger: 'bg-red-600 text-white hover:bg-red-700',
        ghost: 'bg-transparent hover:bg-gray-100 dark:hover:bg-slate-800',
    };

    const sizes = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2',
        lg: 'px-6 py-3 text-lg',
    };

    return (
        <button
            className={twMerge(
                'inline-flex items-center justify-center rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed',
                variants[variant],
                sizes[size],
                className
            )}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;