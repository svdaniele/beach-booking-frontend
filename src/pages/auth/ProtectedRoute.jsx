import { Navigate } from 'react-router-dom';
import useAuthStore from '../../store/authStore';

const ProtectedRoute = ({ children, requiredRoles = [] }) => {
  const { isAuthenticated, user } = useAuthStore();

  // Non autenticato -> redirect a login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Verifica ruolo se richiesto
  if (requiredRoles.length > 0 && user) {
    const hasRequiredRole = requiredRoles.includes(user.ruolo);
    if (!hasRequiredRole) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">403</h1>
            <p className="text-gray-600">Non hai i permessi per accedere a questa pagina.</p>
            <button
              onClick={() => window.history.back()}
              className="mt-4 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
            >
              Torna Indietro
            </button>
          </div>
        </div>
      );
    }
  }

  return children;
};

export default ProtectedRoute;