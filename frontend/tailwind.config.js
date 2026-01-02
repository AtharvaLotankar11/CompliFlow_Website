/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                primary: {
                    light: '#6366f1', // indigo-500
                    dark: '#8b5cf6', // violet-500
                },
            },
            backgroundImage: {
                'auth-gradient': 'linear-gradient(to right, #6366f1, #818cf8, #a78bfa)',
                'auth-gradient-dark': 'linear-gradient(to right, #1e1b4b, #312e81, #4c1d95)',
            }
        },
    },
    plugins: [],
}
