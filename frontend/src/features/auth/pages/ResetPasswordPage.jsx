import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useAuth } from '../../../hooks/useAuth';
import { resetPassword } from '../api/authApi';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import Card from '../../../components/Card';
import Logo from '../../../components/Logo';

const ResetPasswordPage = () => {
    const { resetToken } = useParams();
    const navigate = useNavigate();
    const { setUser } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        password: '',
        confirmPassword: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (formData.password !== formData.confirmPassword) {
            return toast.error('Passwords do not match');
        }

        if (formData.password.length < 6) {
            return toast.error('Password must be at least 6 characters long');
        }

        setIsLoading(true);
        try {
            const data = await resetPassword(resetToken, formData.password);
            setUser(data);
            toast.success('Password reset successful! You are now logged in.');
            navigate('/dashboard');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Password reset failed');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 px-4 py-6 sm:py-8">
            <div className="w-full max-w-md mx-auto animate-fade-in">
                <div className="text-center mb-6 animate-fade-in-up">
                    <Logo className="justify-center" />
                </div>

                <Card className="p-6 sm:p-8 bg-white border border-gray-200 shadow-sm animate-scale-in">
                    <div className="text-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                            Reset Your Password
                        </h2>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                            Enter your new password below
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <Input
                            label="New Password"
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            placeholder="••••••••"
                            minLength={6}
                        />
                        <Input
                            label="Confirm New Password"
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                            placeholder="••••••••"
                            minLength={6}
                        />
                        <Button 
                            type="submit" 
                            className="w-full transform hover:scale-105 transition-all duration-200" 
                            disabled={isLoading}
                        >
                            {isLoading ? 'Resetting Password...' : 'Reset Password'}
                        </Button>
                        <button
                            type="button"
                            onClick={() => navigate('/auth')}
                            className="w-full text-center text-sm text-gray-500 hover:text-gray-700 dark:text-gray-300 transition-all duration-200 mt-2 hover:underline"
                        >
                            Back to Login
                        </button>
                    </form>
                </Card>
            </div>
        </div>
    );
};

export default ResetPasswordPage;