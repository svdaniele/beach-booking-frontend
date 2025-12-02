import { useEffect, useState } from 'react';
import authAPI from '../../api/auth';

const ProtectedRoute = ({ children, requiredRole = null }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = () => {
    const authenticated = authAPI.isAuthenticated();
    setIsAuthenticated(authenticated);

    if (!authenticated) {
      setLoading(false);
      window.location.href = '/login';
      return;
    }

    // Check role if required
    if (requiredRole) {
      const user = authAPI.getCurrentUser();
      const authorized = user && (
        user.ruolo === requiredRole || 
        user.ruolo === 'SUPER_ADMIN' || 
        user.ruolo === 'TENANT_ADMIN'
      );
      setIsAuthorized(authorized);
      
      if (!authorized) {
        setLoading(false);
        return;
      }
    } else {
      setIsAuthorized(true);
    }

    setLoading(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <h2 className="text-2xl font-bold mb-4">Accesso Richiesto</h2>
        <p className="text-gray-600 mb-6">Devi effettuare il login per accedere a questa pagina</p>
        <button
          onClick={() => window.location.href = '/login'}
          className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
        >
          Vai al Login
        </button>
      </div>
    );
  }

  if (!isAuthorized) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <h2 className="text-2xl font-bold mb-4">Accesso Negato</h2>
        <p className="text-gray-600 mb-6">Non hai i permessi per accedere a questa pagina</p>
        <button
          onClick={() => window.location.href = '/dashboard'}
          className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
        >
          Torna alla Dashboard
        </button>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;