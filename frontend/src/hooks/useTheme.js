import { useState, useEffect } from 'react';

export const useTheme = () => {
    const [theme, setTheme] = useState(() => {
        const savedTheme = localStorage.getItem('theme');
        console.log('Initial theme from localStorage:', savedTheme);
        return savedTheme || 'light';
    });

    useEffect(() => {
        const root = window.document.documentElement;
        console.log('Setting theme to:', theme);
        if (theme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prevTheme) => {
            const newTheme = prevTheme === 'light' ? 'dark' : 'light';
            console.log('Toggling theme from', prevTheme, 'to', newTheme);
            return newTheme;
        });
    };

    return { theme, toggleTheme };
};
