import React from 'react';
import { THEME_ASSETS } from '../constants/theme';
import { useAuth } from '../hooks/useAuth';

const Logo = ({ className, size = '15rem' }) => {
    const { user } = useAuth();
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
                {/* Role indicator */}
                {user && (
                    <div className="absolute -bottom-2 -right-2 bg-slate-900 text-white text-[10px] px-3 py-1.5 rounded-full font-black shadow-2xl transform group-hover:scale-110 group-hover:translate-y-[-4px] transition-all duration-300 border border-white/20 dark:bg-slate-800 dark:border-slate-700">
                        {user.role?.toUpperCase()}
                    </div>
                )}

            </div>
        </div>
    );
};


export default Logo;