const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth');
const issueRoutes = require('./routes/issues');
const { notFound, errorHandler } = require('./middleware/errorHandler');
const { apiLimiter } = require('./middleware/rateLimiter');

const app = express();

// Security middleware
app.use(helmet());

// Logging middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Rate limiting
app.use('/api/', apiLimiter);

// CORS configuration
const corsOptions = {
    origin: process.env.NODE_ENV === 'production' 
        ? ['https://yourdomain.com'] // Replace with your production domain
        : ['http://localhost:3000', 'http://localhost:5173'], // Vite default port
    credentials: true,
};
app.use(cors(corsOptions));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/issues', issueRoutes);

// Root route
app.get('/', (req, res) => {
    res.json({
        message: 'Compliflow API is running...',
        version: '1.0.0',
        environment: process.env.NODE_ENV
    });
});

// Health check route
app.get('/api/health', (req, res) => {
    res.status(200).json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});

// Error Handling
app.use(notFound);
app.use(errorHandler);

module.exports = app;
