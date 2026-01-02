// Middleware to check if user has required role
const requireRole = (roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ message: 'Not authorized, no user found' });
        }

        // Convert single role to array for consistency
        const allowedRoles = Array.isArray(roles) ? roles : [roles];

        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ 
                message: `Access denied. Required role: ${allowedRoles.join(' or ')}. Your role: ${req.user.role}` 
            });
        }

        next();
    };
};

// Specific role middlewares
const requireAdmin = requireRole('admin');
const requireUser = requireRole(['user', 'admin']); // Both users and admins can access

module.exports = {
    requireRole,
    requireAdmin,
    requireUser,
};