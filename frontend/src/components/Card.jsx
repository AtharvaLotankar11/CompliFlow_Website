import React from 'react';
import { twMerge } from 'tailwind-merge';
import { motion } from 'framer-motion';

const Card = ({ className, children, ...props }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={twMerge(
                'glass rounded-3xl p-8 transition-all duration-300 border border-white/40 hover:border-accent/40 hover:shadow-2xl',
                className
            )}
            {...props}
        >
            {children}
        </motion.div>
    );
};

export default Card;
