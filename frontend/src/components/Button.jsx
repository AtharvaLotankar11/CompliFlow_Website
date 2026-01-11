import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { motion } from 'framer-motion';

const Button = ({ className, variant = 'primary', size = 'md', children, ...props }) => {
    const variants = {
        primary: 'bg-accent-gradient text-white shadow-accent hover:brightness-110 active:scale-95',
        secondary: 'glass text-slate-700 hover:bg-white/60 dark:text-gray-100 dark:hover:bg-slate-800/60',
        danger: 'bg-red-500 text-white shadow-lg shadow-red-500/30 hover:bg-red-600',
        ghost: 'bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800',
        accent: 'bg-secondary-gradient text-white shadow-lg shadow-secondary/30 hover:brightness-110',
        lime: 'btn-lime',
    };

    const sizes = {
        sm: 'px-4 py-2 text-sm rounded-xl',
        md: 'px-6 py-3 text-base rounded-2xl',
        lg: 'px-8 py-4 text-lg rounded-3xl',
    };

    return (
        <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            className={twMerge(
                'inline-flex items-center justify-center font-semibold transition-all focus:outline-none focus:ring-4 focus:ring-accent/20 disabled:opacity-50 disabled:cursor-not-allowed border border-white/20',
                variants[variant],
                sizes[size],
                className
            )}
            {...props}
        >
            {children}
        </motion.button>
    );
};

export default Button;
