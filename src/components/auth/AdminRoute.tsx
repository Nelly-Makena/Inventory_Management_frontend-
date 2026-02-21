import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

// only admin view admin others redirected to dashboard
const AdminRoute = ({ children }: { children: React.ReactNode }) => {
    const { user, isAuthenticated, loading } = useAuth();

    if (loading) return null;

    if (!isAuthenticated) return <Navigate to="/login" replace />;

    // checking role
    if (user?.role !== 'ADMIN') return <Navigate to="/dashboard" replace />;

    return <>{children}</>;
};

export default AdminRoute;