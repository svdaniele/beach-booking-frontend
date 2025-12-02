import { useEffect } from 'react';
import useAuthStore from '../store/authStore';

const useAuth = () => {
  const { user, isAuthenticated, login, logout, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const hasRole = (role) => {
    if (!user) return false;
    if (user.ruolo === 'SUPER_ADMIN') return true;
    if (Array.isArray(role)) return role.includes(user.ruolo);
    return user.ruolo === role;
  };

  const isAdmin = () => hasRole(['SUPER_ADMIN', 'TENANT_ADMIN']);
  
  const isStaff = () => hasRole(['SUPER_ADMIN', 'TENANT_ADMIN', 'STAFF']);

  return {
    user,
    isAuthenticated,
    login,
    logout,
    hasRole,
    isAdmin,
    isStaff,
  };
};

export default useAuth;