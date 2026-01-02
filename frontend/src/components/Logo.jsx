import React from 'react';
import { THEME_ASSETS } from '../constants/theme';
import { useAuth } from '../hooks/useAuth';

const Logo = ({ className, size = '15rem' }) => {
    const { user } = useAuth();
    
    // Always use light logo
    const logoSrc = THEME_ASSETS.LOGO;

    return (
        <div className={`flex justify-center ${className}`}>
            <div className="relative">
                <img
                    src={logoSrc}
                    alt="CompliFlow Logo"
                    className="object-contain transition-all duration-300 ease-in-out opacity-100 scale-100"
                    style={{ height: size, width: size }}
                    onError={(e) => {
                        console.error('Logo failed to load:', e.target.src);
                    }}
                />
                {/* Role indicator */}
                {user && (
                    <div className="absolute -bottom-1 -right-1 bg-indigo-600 text-white text-xs px-2 py-1 rounded-full font-semibold">
                        {user.role?.toUpperCase()}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Logo;