import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useAuth } from '../../../hooks/useAuth';
import { login, register, forgotPassword, verifyOTP, resetPasswordWithOTP } from '../api/authApi';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import Card from '../../../components/Card';
import Logo from '../../../components/Logo';
import Footer from '../../../components/Footer';
import { motion, AnimatePresence } from 'framer-motion';

const AuthPage = () => {
    const [activeTab, setActiveTab] = useState('login'); // 'login', 'register', 'forgot', 'otp', 'reset'
    const [isLoading, setIsLoading] = useState(false);
    const [otpEmail, setOtpEmail] = useState(''); // Store email for OTP verification
    const { setUser } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'user',
        otp: '',
        newPassword: '',
        confirmNewPassword: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const data = await login({ email: formData.email, password: formData.password });
            setUser(data);
            toast.success('Welcome back!');
            // Redirect based on user role
            if (data.role === 'admin') {
                navigate('/admin');
            } else {
                navigate('/dashboard');
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Login failed');
        } finally {
            setIsLoading(false);
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            return toast.error('Passwords do not match');
        }
        setIsLoading(true);
        try {
            const data = await register({
                name: formData.name,
                email: formData.email,
                password: formData.password,
                role: formData.role,
            });
            setUser(data);
            toast.success('Account created successfully!');
            // Redirect based on user role
            if (data.role === 'admin') {
                navigate('/admin');
            } else {
                navigate('/dashboard');
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Registration failed');
        } finally {
            setIsLoading(false);
        }
    };

    const handleForgot = async (e) => {
        e.preventDefault();
        if (!formData.email) {
            return toast.error('Please enter your email address');
        }
        setIsLoading(true);
        try {
            await forgotPassword(formData.email);
            setOtpEmail(formData.email);
            toast.success('OTP sent to your email! Please check your inbox.');
            setActiveTab('otp');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to send OTP');
        } finally {
            setIsLoading(false);
        }
    };

    const handleVerifyOTP = async (e) => {
        e.preventDefault();
        if (!formData.otp || formData.otp.length !== 6) {
            return toast.error('Please enter a valid 6-digit OTP');
        }
        setIsLoading(true);
        try {
            await verifyOTP(otpEmail, formData.otp);
            toast.success('OTP verified! Now set your new password.');
            setActiveTab('reset');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Invalid OTP');
        } finally {
            setIsLoading(false);
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        if (formData.newPassword !== formData.confirmNewPassword) {
            return toast.error('Passwords do not match');
        }
        if (formData.newPassword.length < 6) {
            return toast.error('Password must be at least 6 characters long');
        }
        setIsLoading(true);
        try {
            await resetPasswordWithOTP(otpEmail, formData.otp, formData.newPassword);
            toast.success('Password reset successful! You can now login with your new password.');
            setFormData({
                name: '',
                email: '',
                password: '',
                confirmPassword: '',
                role: 'user',
                otp: '',
                newPassword: '',
                confirmNewPassword: '',
            });
            setOtpEmail('');
            setActiveTab('login');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to reset password');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 px-4 py-6 sm:py-8 flex flex-col">
            <div className="flex-grow w-full max-w-md mx-auto animate-fade-in flex items-center mb-8">
                <Card className="w-full p-6 sm:p-8 bg-white border border-gray-200 shadow-sm animate-scale-in">
                    <div className="text-center mb-8 animate-fade-in-up">
                        <Logo className="justify-center" />
                    </div>

                    <div className="flex border-b border-gray-200 mb-6">
                        <button
                            className={`flex-1 pb-3 text-sm font-medium transition-all duration-200 ${activeTab === 'login' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'
                                }`}
                            onClick={() => setActiveTab('login')}
                        >
                            Sign In
                        </button>
                        <button
                            className={`flex-1 pb-3 text-sm font-medium transition-all duration-200 ${activeTab === 'register' ? 'text-blue-600 border-b-2 border-blue-600 dark:text-blue-400 dark:border-blue-400' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                                }`}
                            onClick={() => setActiveTab('register')}
                        >
                            Sign Up
                        </button>
                    </div>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                        >
                            {activeTab === 'login' && (
                                <form onSubmit={handleLogin} className="space-y-4">
                                    <Input
                                        label="Email Address"
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        placeholder="name@company.com"
                                    />
                                    <Input
                                        label="Password"
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                        placeholder="••••••••"
                                    />
                                    <div className="text-right">
                                        <button
                                            type="button"
                                            onClick={() => setActiveTab('forgot')}
                                            className="text-xs text-blue-600 hover:text-blue-700 dark:text-blue-400 transition-colors duration-200 hover:underline"
                                        >
                                            Forgot password?
                                        </button>
                                    </div>
                                    <Button type="submit" className="w-full transform hover:scale-105 transition-all duration-200" disabled={isLoading}>
                                        {isLoading ? 'Signing in...' : 'Sign In'}
                                    </Button>
                                </form>
                            )}

                            {activeTab === 'register' && (
                                <form onSubmit={handleRegister} className="space-y-4">
                                    <Input
                                        label="Full Name"
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        placeholder="John Doe"
                                    />
                                    <Input
                                        label="Email Address"
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        placeholder="name@company.com"
                                    />
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                            Role
                                        </label>
                                        <select
                                            name="role"
                                            value={formData.role || 'user'}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all dark:bg-slate-800 dark:border-slate-700 dark:text-gray-100"
                                        >
                                            <option value="user">User</option>
                                            <option value="admin">Admin</option>
                                        </select>
                                    </div>
                                    <Input
                                        label="Password"
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                        placeholder="••••••••"
                                    />
                                    <Input
                                        label="Confirm Password"
                                        type="password"
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        required
                                        placeholder="••••••••"
                                    />
                                    <Button type="submit" className="w-full transform hover:scale-105 transition-all duration-200" disabled={isLoading}>
                                        {isLoading ? 'Creating account...' : 'Create Account'}
                                    </Button>
                                </form>
                            )}

                            {activeTab === 'forgot' && (
                                <form onSubmit={handleForgot} className="space-y-4">
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                                        Enter your email address and we'll send you an OTP to reset your password.
                                    </p>
                                    <Input
                                        label="Email Address"
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        placeholder="name@company.com"
                                    />
                                    <Button type="submit" className="w-full transform hover:scale-105 transition-all duration-200" disabled={isLoading}>
                                        {isLoading ? 'Sending OTP...' : 'Send OTP'}
                                    </Button>
                                    <button
                                        type="button"
                                        onClick={() => setActiveTab('login')}
                                        className="w-full text-center text-sm text-gray-500 hover:text-gray-700 dark:text-gray-300 transition-all duration-200 mt-2 hover:underline"
                                    >
                                        Back to Login
                                    </button>
                                </form>
                            )}

                            {activeTab === 'otp' && (
                                <form onSubmit={handleVerifyOTP} className="space-y-4">
                                    <div className="text-center mb-4">
                                        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                                            Verify OTP
                                        </h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            We've sent a 6-digit OTP to <strong>{otpEmail}</strong>
                                        </p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                            OTP expires in 5 minutes
                                        </p>
                                    </div>
                                    <Input
                                        label="Enter OTP"
                                        type="text"
                                        name="otp"
                                        value={formData.otp}
                                        onChange={handleChange}
                                        required
                                        placeholder="123456"
                                        maxLength="6"
                                        className="text-center text-2xl tracking-widest"
                                    />
                                    <Button type="submit" className="w-full transform hover:scale-105 transition-all duration-200" disabled={isLoading}>
                                        {isLoading ? 'Verifying...' : 'Verify OTP'}
                                    </Button>
                                    <div className="flex justify-between text-sm">
                                        <button
                                            type="button"
                                            onClick={() => setActiveTab('forgot')}
                                            className="text-gray-500 hover:text-gray-700 dark:text-gray-300 transition-all duration-200 hover:underline"
                                        >
                                            Change Email
                                        </button>
                                        <button
                                            type="button"
                                            onClick={handleForgot}
                                            className="text-blue-600 hover:text-blue-700 dark:text-blue-400 transition-all duration-200 hover:underline"
                                            disabled={isLoading}
                                        >
                                            Resend OTP
                                        </button>
                                    </div>
                                </form>
                            )}

                            {activeTab === 'reset' && (
                                <form onSubmit={handleResetPassword} className="space-y-4">
                                    <div className="text-center mb-4">
                                        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                                            Set New Password
                                        </h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            Create a strong password for your account
                                        </p>
                                    </div>
                                    <Input
                                        label="New Password"
                                        type="password"
                                        name="newPassword"
                                        value={formData.newPassword}
                                        onChange={handleChange}
                                        required
                                        placeholder="••••••••"
                                    />
                                    <Input
                                        label="Confirm New Password"
                                        type="password"
                                        name="confirmNewPassword"
                                        value={formData.confirmNewPassword}
                                        onChange={handleChange}
                                        required
                                        placeholder="••••••••"
                                    />
                                    <Button type="submit" className="w-full transform hover:scale-105 transition-all duration-200" disabled={isLoading}>
                                        {isLoading ? 'Resetting Password...' : 'Reset Password'}
                                    </Button>
                                    <button
                                        type="button"
                                        onClick={() => setActiveTab('login')}
                                        className="w-full text-center text-sm text-gray-500 hover:text-gray-700 dark:text-gray-300 transition-all duration-200 mt-2 hover:underline"
                                    >
                                        Back to Login
                                    </button>
                                </form>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </Card>
            </div>
            
            <Footer />
        </div>
    );
};

export default AuthPage;
