import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import { useAuth } from './hooks/useAuth';
import ErrorBoundary from './components/ErrorBoundary';
import ScrollToTop from './components/ScrollToTop';
import AuthPage from './features/auth/pages/AuthPage';
import ResetPasswordPage from './features/auth/pages/ResetPasswordPage';
import DashboardPage from './features/issues/pages/DashboardPage';
import AdminDashboard from './features/admin/pages/AdminDashboard';
import LandingPage from './features/landing/pages/LandingPage';

const ProtectedRoute = ({ children, adminOnly = false, userOnly = false }) => {
    const { user, loading } = useAuth();

    if (loading) return null;
    if (!user) return <Navigate to="/auth" />;
    if (adminOnly && user.role !== 'admin') return <Navigate to="/dashboard" />;
    if (userOnly && user.role === 'admin') return <Navigate to="/admin" />;

    return children;
};

const DashboardRedirect = () => {
    const { user } = useAuth();
    
    // Default redirect based on role, but don't force admins away from user view
    if (user?.role === 'admin') {
        return <Navigate to="/admin" />;
    }
    return <Navigate to="/dashboard" />;
};

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/reset-password/:resetToken" element={<ResetPasswordPage />} />
            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute userOnly={true}>
                        <DashboardPage />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/admin"
                element={
                    <ProtectedRoute adminOnly={true}>
                        <AdminDashboard />
                    </ProtectedRoute>
                }
            />
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
};

function App() {
    return (
        <ErrorBoundary>
            <Router>
                <ScrollToTop />
                <AuthProvider>
                    <AppRoutes />
                </AuthProvider>
            </Router>
        </ErrorBoundary>
    );
}

export default App;
