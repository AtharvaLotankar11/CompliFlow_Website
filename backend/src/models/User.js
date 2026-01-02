const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please add a name'],
        },
        email: {
            type: String,
            required: [true, 'Please add an email'],
            unique: true,
            match: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                'Please add a valid email',
            ],
        },
        password: {
            type: String,
            required: [true, 'Please add a password'],
            minlength: 6,
            select: false,
        },
        role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user',
        },
        resetPasswordToken: String,
        resetPasswordExpire: Date,
        resetPasswordOTP: String,
        resetPasswordOTPExpire: Date,
        otpAttempts: {
            type: Number,
            default: 0
        },
        otpBlockedUntil: Date,
    },
    {
        timestamps: true,
    }
);

// Encrypt password using bcrypt
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Generate and hash password token
userSchema.methods.getResetPasswordToken = function () {
    // Generate token
    const resetToken = crypto.randomBytes(20).toString('hex');

    // Hash token and set to resetPasswordToken field
    this.resetPasswordToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');

    // Set expire
    this.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 minutes

    return resetToken;
};

// Generate OTP for password reset
userSchema.methods.generateResetPasswordOTP = function () {
    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Hash OTP and set to resetPasswordOTP field
    this.resetPasswordOTP = crypto
        .createHash('sha256')
        .update(otp)
        .digest('hex');
    
    // Set expire (5 minutes)
    this.resetPasswordOTPExpire = Date.now() + 5 * 60 * 1000;
    
    // Reset OTP attempts
    this.otpAttempts = 0;
    this.otpBlockedUntil = undefined;
    
    return otp;
};

// Verify OTP
userSchema.methods.verifyResetPasswordOTP = function (enteredOTP) {
    // Check if user is blocked
    if (this.otpBlockedUntil && this.otpBlockedUntil > Date.now()) {
        const remainingTime = Math.ceil((this.otpBlockedUntil - Date.now()) / 1000 / 60);
        throw new Error(`Too many failed attempts. Try again in ${remainingTime} minutes.`);
    }

    // Check if OTP has expired
    if (!this.resetPasswordOTPExpire || this.resetPasswordOTPExpire < Date.now()) {
        throw new Error('OTP has expired. Please request a new one.');
    }

    // Hash the entered OTP
    const hashedOTP = crypto
        .createHash('sha256')
        .update(enteredOTP)
        .digest('hex');

    // Check if OTP matches
    if (hashedOTP !== this.resetPasswordOTP) {
        // Increment attempts
        this.otpAttempts += 1;
        
        // Block user after 3 failed attempts
        if (this.otpAttempts >= 3) {
            this.otpBlockedUntil = Date.now() + 15 * 60 * 1000; // Block for 15 minutes
            throw new Error('Too many failed attempts. You are blocked for 15 minutes.');
        }
        
        throw new Error(`Invalid OTP. ${3 - this.otpAttempts} attempts remaining.`);
    }

    return true;
};

// Clear OTP data
userSchema.methods.clearResetPasswordOTP = function () {
    this.resetPasswordOTP = undefined;
    this.resetPasswordOTPExpire = undefined;
    this.otpAttempts = 0;
    this.otpBlockedUntil = undefined;
};

module.exports = mongoose.model('User', userSchema);
