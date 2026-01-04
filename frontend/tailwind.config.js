/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            fontSize: {
                'xs': ['0.875rem', { lineHeight: '1.25rem' }],
                'sm': ['1rem', { lineHeight: '1.5rem' }],
                'base': ['1.125rem', { lineHeight: '1.75rem' }],
                'lg': ['1.25rem', { lineHeight: '1.75rem' }],
                'xl': ['1.5rem', { lineHeight: '2rem' }],
                '2xl': ['1.875rem', { lineHeight: '2.25rem' }],
                '3xl': ['2.25rem', { lineHeight: '2.5rem' }],
                '4xl': ['3rem', { lineHeight: '3rem' }],
                '5xl': ['3.75rem', { lineHeight: '3.75rem' }],
            },
            colors: {
                primary: {
                    DEFAULT: '#ffffff',
                    light: '#f8fafc',
                    dark: '#e2e8f0',
                },
                accent: {
                    light: '#818cf8',
                    DEFAULT: '#4f46e5',
                    dark: '#4338ca',
                },
                secondary: {
                    light: '#c084fc',
                    DEFAULT: '#a855f7',
                    dark: '#9333ea',
                }
            },
            fontFamily: {
                sans: ['Outfit', 'Inter', 'sans-serif'],
                heading: ['Poppins', 'sans-serif'],
            },
            backgroundImage: {
                'premium-gradient': 'linear-gradient(135deg, #ffffff 0%, #f1f5f9 100%)',
                'accent-gradient': 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                'secondary-gradient': 'linear-gradient(135deg, #a855f7 0%, #c084fc 100%)',
                'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0.3) 100%)',
                'mesh-gradient': 'radial-gradient(at 0% 0%, rgba(99, 102, 241, 0.15) 0px, transparent 50%), radial-gradient(at 100% 0%, rgba(139, 92, 246, 0.15) 0px, transparent 50%), radial-gradient(at 100% 100%, rgba(244, 63, 94, 0.1) 0px, transparent 50%), radial-gradient(at 0% 100%, rgba(34, 197, 94, 0.1) 0px, transparent 50%)',
            },
            boxShadow: {
                'premium': '0 20px 50px -12px rgba(0, 0, 0, 0.1)',
                'accent': '0 10px 25px -5px rgba(79, 70, 229, 0.4)',
                'inner-glass': 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.1)',
            },
            borderRadius: {
                '2xl': '1.5rem',
                '3xl': '2rem',
            }
        },
    },
    plugins: [],
}

