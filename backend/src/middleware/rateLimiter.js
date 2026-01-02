const rateLimit = require('express-rate-limit');

// Check if we're in development mode
const isDevelopment = process.env.NODE_ENV === 'development';
const bypassEnabled = process.env.BYPASS_RATE_LIMIT === 'true';

// Create a wrapper that applies bypass first, then rate limiting
const createLimiterWithBypass = (options) => {
    const limiter = rateLimit(options);
    
    return (req, res, next) => {
        // If development bypass is enabled, skip rate limiting entirely
        if (isDevelopment && bypassEnabled) {
            console.log(`🔓 Rate limiting bypassed for ${req.path}`);
            return next();
        }
        
        // Otherwise, apply rate limiting
        return limiter(req, res, next);
    };
};

// General API rate limiter
const apiLimiter = createLimiterWithBypass({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: isDevelopment ? 1000 : 100,
    message: {
        message: 'Too many requests from this IP, please try again later.'
    },
    standardHeaders: true,
    legacyHeaders: false,
});

// Strict rate limiter for auth endpoints
const authLimiter = createLimiterWithBypass({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: isDevelopment ? 200 : 50,
    message: {
        message: 'Too many authentication attempts, please try again later.'
    },
    standardHeaders: true,
    legacyHeaders: false,
});

// Specific rate limiter for OTP requests
const otpLimiter = createLimiterWithBypass({
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: isDevelopment ? 50 : 10,
    message: {
        message: 'Too many OTP requests. Please wait before requesting another OTP.'
    },
    standardHeaders: true,
    legacyHeaders: false,
});

// Specific rate limiter for OTP verification
const otpVerifyLimiter = createLimiterWithBypass({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: isDevelopment ? 100 : 20,
    message: {
        message: 'Too many OTP verification attempts. Please try again later.'
    },
    standardHeaders: true,
    legacyHeaders: false,
});

// Create issue rate limiter
const createIssueLimiter = createLimiterWithBypass({
    windowMs: 60 * 1000, // 1 minute
    max: 10, // limit each IP to 10 create requests per minute
    message: {
        message: 'Too many issues created, please slow down.'
    },
    standardHeaders: true,
    legacyHeaders: false,
});

module.exports = {
    apiLimiter,
    authLimiter,
    otpLimiter,
    otpVerifyLimiter,
    createLimiter: createIssueLimiter
};