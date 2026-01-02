const User = require('../models/User');
const generateToken = require('../generateToken');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
    const { name, email, password, role } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({
        name,
        email,
        password,
        role: role || 'user', // Default to 'user' if no role specified
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id),
        });
    } else {
        res.status(400).json({ message: 'Invalid user data' });
    }
};

// @desc    Authenticate a user
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id),
        });
    } else {
        res.status(401).json({ message: 'Invalid email or password' });
    }
};

// @desc    Get user profile
// @route   GET /api/auth/profile
// @access  Private
const getUserProfile = async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};

// @desc    Forgot password
// @route   POST /api/auth/forgot-password
// @access  Public
const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'No user found with that email' });
        }

        // Check if user is blocked from OTP attempts
        if (user.otpBlockedUntil && user.otpBlockedUntil > Date.now()) {
            const remainingTime = Math.ceil((user.otpBlockedUntil - Date.now()) / 1000 / 60);
            return res.status(429).json({ 
                message: `Too many failed attempts. Try again in ${remainingTime} minutes.` 
            });
        }

        // Generate OTP
        const otp = user.generateResetPasswordOTP();

        await user.save({ validateBeforeSave: false });

        const htmlMessage = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                <div style="text-align: center; margin-bottom: 30px;">
                    <h1 style="color: #007bff; margin: 0;">CompliFlow</h1>
                    <p style="color: #666; margin: 5px 0;">Complaint & Issue Tracking System</p>
                </div>
                
                <div style="background-color: #f8f9fa; padding: 30px; border-radius: 10px; text-align: center;">
                    <h2 style="color: #333; margin-bottom: 20px;">Password Reset OTP</h2>
                    <p style="color: #666; margin-bottom: 30px;">You requested a password reset. Use the OTP below to proceed:</p>
                    
                    <div style="background-color: #007bff; color: white; font-size: 32px; font-weight: bold; padding: 20px; border-radius: 8px; letter-spacing: 8px; margin: 20px 0;">
                        ${otp}
                    </div>
                    
                    <p style="color: #dc3545; font-weight: bold; margin: 20px 0;">
                        This OTP will expire in 5 minutes
                    </p>
                    
                    <p style="color: #666; font-size: 14px; margin-top: 30px;">
                        If you didn't request this, please ignore this email and your password will remain unchanged.
                    </p>
                </div>
                
                <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
                    <p style="color: #999; font-size: 12px;">
                        This is an automated message. Please do not reply to this email.
                    </p>
                </div>
            </div>
        `;

        const textMessage = `
Password Reset OTP for CompliFlow

Your OTP: ${otp}

This OTP will expire in 5 minutes.

If you didn't request this, please ignore this email.
        `;

        try {
            await sendEmail({
                email: user.email,
                subject: 'Password Reset OTP - CompliFlow',
                message: textMessage,
                html: htmlMessage,
            });

            res.status(200).json({ 
                success: true, 
                message: 'OTP sent successfully to your email. Please check your inbox.',
                email: user.email // Send back email for frontend reference
            });
        } catch (err) {
            console.error('Email sending error:', err);
            
            // Clear OTP data if email fails
            user.clearResetPasswordOTP();
            await user.save({ validateBeforeSave: false });

            return res.status(500).json({ message: 'Email could not be sent. Please try again later.' });
        }
    } catch (error) {
        console.error('Forgot password error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Verify OTP for password reset
// @route   POST /api/auth/verify-otp
// @access  Public
const verifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;

        if (!email || !otp) {
            return res.status(400).json({ message: 'Email and OTP are required' });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        try {
            // Verify OTP
            user.verifyResetPasswordOTP(otp);
            
            // Generate a temporary token for password reset
            const resetToken = user.getResetPasswordToken();
            
            await user.save({ validateBeforeSave: false });

            res.status(200).json({
                success: true,
                message: 'OTP verified successfully. You can now reset your password.',
                resetToken: resetToken
            });
        } catch (otpError) {
            // Save the updated attempt count or block status
            await user.save({ validateBeforeSave: false });
            
            return res.status(400).json({ 
                message: otpError.message 
            });
        }
    } catch (error) {
        console.error('OTP verification error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Reset password with OTP verification
// @route   PUT /api/auth/reset-password-otp
// @access  Public
const resetPasswordWithOTP = async (req, res) => {
    try {
        const { email, otp, newPassword } = req.body;

        if (!email || !otp || !newPassword) {
            return res.status(400).json({ message: 'Email, OTP, and new password are required' });
        }

        if (newPassword.length < 6) {
            return res.status(400).json({ message: 'Password must be at least 6 characters long' });
        }

        const user = await User.findOne({ email }).select('+password');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        try {
            // Verify OTP one more time
            user.verifyResetPasswordOTP(otp);
            
            // Set new password
            user.password = newPassword;
            
            // Clear all reset-related data
            user.clearResetPasswordOTP();
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;
            
            await user.save();

            res.status(200).json({
                success: true,
                message: 'Password reset successful. You can now login with your new password.',
            });
        } catch (otpError) {
            // Save the updated attempt count or block status
            await user.save({ validateBeforeSave: false });
            
            return res.status(400).json({ 
                message: otpError.message 
            });
        }
    } catch (error) {
        console.error('Password reset error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Reset password
// @route   PUT /api/auth/reset-password/:resettoken
// @access  Public
const resetPassword = async (req, res) => {
    try {
        // Get hashed token
        const resetPasswordToken = crypto
            .createHash('sha256')
            .update(req.params.resettoken)
            .digest('hex');

        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() },
        });

        if (!user) {
            return res.status(400).json({ message: 'Invalid or expired token' });
        }

        // Set new password
        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        
        // Clear OTP data as well
        user.clearResetPasswordOTP();
        
        await user.save();

        res.status(200).json({
            success: true,
            message: 'Password reset successful',
            token: generateToken(user._id),
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    registerUser,
    loginUser,
    getUserProfile,
    forgotPassword,
    verifyOTP,
    resetPasswordWithOTP,
    resetPassword,
};
