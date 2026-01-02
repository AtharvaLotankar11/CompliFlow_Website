const express = require('express');
const {
    registerUser,
    loginUser,
    getUserProfile,
    forgotPassword,
    verifyOTP,
    resetPasswordWithOTP,
    resetPassword,
} = require('../controllers/authController');
const { protect } = require('../middleware/auth');
const { authLimiter, otpLimiter, otpVerifyLimiter } = require('../middleware/rateLimiter');
const { 
    validateRegister, 
    validateLogin, 
    validateForgotPassword,
    validateResetPassword,
    validateOTP,
    validateResetPasswordOTP,
    handleValidationErrors 
} = require('../validators/authValidator');

const router = express.Router();

router.post('/register', authLimiter, validateRegister, handleValidationErrors, registerUser);
router.post('/login', authLimiter, validateLogin, handleValidationErrors, loginUser);
router.get('/profile', protect, getUserProfile);
router.post('/forgot-password', otpLimiter, validateForgotPassword, handleValidationErrors, forgotPassword);
router.post('/verify-otp', otpVerifyLimiter, validateOTP, handleValidationErrors, verifyOTP);
router.put('/reset-password-otp', otpVerifyLimiter, validateResetPasswordOTP, handleValidationErrors, resetPasswordWithOTP);
router.put('/reset-password/:resettoken', authLimiter, validateResetPassword, handleValidationErrors, resetPassword);

module.exports = router;
