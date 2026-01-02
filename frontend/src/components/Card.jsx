import React from 'react';
import { twMerge } from 'tailwind-merge';

const Card = ({ className, children, ...props }) => {
    return (
        <div
            className={twMerge(
                'glass rounded-xl p-6 transition-all duration-200',
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
};

export default Card;