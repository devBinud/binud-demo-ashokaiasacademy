import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Loader from '../../components/ui/Loader';

export default function AdminGuard({ children }) {
  const { user, isAdmin } = useAuth();

  if (user === undefined) {
    return <Loader fullscreen text="Authenticating..." />;
  }

  if (!user) return <Navigate to="/admin/login" replace />;

  // Signed in, but not an admin (e.g. a student account) → student portal
  if (!isAdmin) return <Navigate to="/login" replace />;

  return children;
}
