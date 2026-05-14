import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Loader from '../../components/ui/Loader';

export default function AdminGuard({ children }) {
  const { user } = useAuth();

  if (user === undefined) {
    return <Loader fullscreen text="Authenticating..." />;
  }

  if (!user) return <Navigate to="/admin/login" replace />;

  return children;
}
