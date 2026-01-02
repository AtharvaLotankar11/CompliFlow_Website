// Form validation utilities

export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const validatePassword = (password) => {
    // At least 6 characters, one uppercase, one lowercase, one number
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
    return passwordRegex.test(password);
};

export const validateRequired = (value) => {
    return value && value.trim().length > 0;
};

export const validateLength = (value, min, max) => {
    if (!value) return false;
    const length = value.trim().length;
    return length >= min && length <= max;
};

export const getPasswordStrength = (password) => {
    if (!password) return { strength: 0, text: 'No password' };
    
    let strength = 0;
    const checks = {
        length: password.length >= 8,
        lowercase: /[a-z]/.test(password),
        uppercase: /[A-Z]/.test(password),
        numbers: /\d/.test(password),
        special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };
    
    strength = Object.values(checks).filter(Boolean).length;
    
    const strengthMap = {
        0: { strength: 0, text: 'Very Weak', color: 'red' },
        1: { strength: 20, text: 'Weak', color: 'red' },
        2: { strength: 40, text: 'Fair', color: 'orange' },
        3: { strength: 60, text: 'Good', color: 'yellow' },
        4: { strength: 80, text: 'Strong', color: 'green' },
        5: { strength: 100, text: 'Very Strong', color: 'green' },
    };
    
    return strengthMap[strength];
};