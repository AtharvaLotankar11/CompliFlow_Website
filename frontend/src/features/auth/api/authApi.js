import api from '../../../api/api';

export const register = async (userData) => {
    try {
        console.log('Attempting registration with:', { 
            name: userData.name, 
            email: userData.email, 
            role: userData.role 
        });
        const response = await api.post('/auth/register', userData);
        console.log('Registration successful:', response.data);
        return response.data;
    } catch (error) {
        console.error('Registration error:', error.response?.data || error.message);
        throw error;
    }
};

export const login = async (userData) => {
    try {
        console.log('Attempting login with:', { email: userData.email });
        const response = await api.post('/auth/login', userData);
        console.log('Login successful:', response.data);
        return response.data;
    } catch (error) {
        console.error('Login error:', error.response?.data || error.message);
        throw error;
    }
};

export const getProfile = async () => {
    const response = await api.get('/auth/profile');
    return response.data;
};

export const forgotPassword = async (email) => {
    try {
        console.log('Attempting forgot password for:', email);
        const response = await api.post('/auth/forgot-password', { email });
        console.log('Forgot password successful:', response.data);
        return response.data;
    } catch (error) {
        console.error('Forgot password error:', error.response?.data || error.message);
        throw error;
    }
};

export const verifyOTP = async (email, otp) => {
    try {
        console.log('Attempting OTP verification for:', email);
        const response = await api.post('/auth/verify-otp', { email, otp });
        console.log('OTP verification successful:', response.data);
        return response.data;
    } catch (error) {
        console.error('OTP verification error:', error.response?.data || error.message);
        throw error;
    }
};

export const resetPasswordWithOTP = async (email, otp, newPassword) => {
    try {
        console.log('Attempting password reset with OTP for:', email);
        const response = await api.put('/auth/reset-password-otp', { 
            email, 
            otp, 
            newPassword 
        });
        console.log('Password reset with OTP successful:', response.data);
        return response.data;
    } catch (error) {
        console.error('Password reset with OTP error:', error.response?.data || error.message);
        throw error;
    }
};

export const resetPassword = async (resetToken, password) => {
    try {
        console.log('Attempting password reset with token:', resetToken);
        const response = await api.put(`/auth/reset-password/${resetToken}`, { password });
        console.log('Password reset successful:', response.data);
        return response.data;
    } catch (error) {
        console.error('Password reset error:', error.response?.data || error.message);
        throw error;
    }
};
