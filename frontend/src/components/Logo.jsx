import React from 'react';
import { THEME_ASSETS } from '../constants/theme';

const Logo = ({ className, size = '15rem' }) => {
    const logoSrc = THEME_ASSETS.LOGO;

    return (
        <div className={`flex justify-center animate-reveal ${className}`}>
            <div className="relative group cursor-pointer">
                <img
                    src={logoSrc}
                    alt="CompliFlow Logo"
                    className="object-contain transition-all duration-500 ease-out group-hover:scale-110 group-hover:drop-shadow-2xl animate-float"
                    style={{ height: size, width: size }}
                    onError={(e) => {
                        console.error('Logo failed to load:', e.target.src);
                    }}
                />
            </div>
        </div>
    );
};

export default Logo;