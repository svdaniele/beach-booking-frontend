import { create } from 'zustand';
import authAPI from '../api/auth';

const useAuthStore = create((set, get) => ({
  // State
  user: JSON.parse(localStorage.getItem('user')) || null,
  token: localStorage.getItem('token') || null,
  tenantId: localStorage.getItem('tenantId') || null,
  isAuthenticated: !!localStorage.getItem('token'),
  loading: false,
  error: null,

  // Actions
  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const data = await authAPI.login(email, password);
            
      // Salva in localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      if (data.user.tenantId) {
        localStorage.setItem('tenantId', data.user.tenantId);
      }
      
      set({
        user: data.user,
        token: data.token,
        tenantId: data.user.tenantId,
        isAuthenticated: true,
        loading: false,
      });
      
      return data;
    } catch (error) {
      set({
        error: error.response?.data?.message || 'Errore durante il login',
        loading: false,
      });
      throw error;
    }
  },

  registerCustomer: async (formData) => {
    set({ loading: true, error: null });
    try {
      const data = await authAPI.registerCustomer(formData);
      set({ loading: false });
      return data;
    } catch (error) {
      set({
        error: error.response?.data?.message || 'Errore durante la registrazione',
        loading: false,
      });
      throw error;
    }
  },

  registerTenant: async (formData) => {
    set({ loading: true, error: null });
    try {
      const data = await authAPI.registerTenant(formData);
      set({ loading: false });
      return data;
    } catch (error) {
      set({
        error: error.response?.data?.message || 'Errore durante la registrazione',
        loading: false,
      });
      throw error;
    }
  },

  logout: () => {
    // Pulisci localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('tenantId');
    
    // Reset state
    set({
      user: null,
      token: null,
      tenantId: null,
      isAuthenticated: false,
      error: null,
    });
  },

  refreshUser: async () => {
    try {
      const user = await authAPI.getCurrentUser();
      localStorage.setItem('user', JSON.stringify(user));
      set({ user });
      return user;
    } catch (error) {
      console.error('Error refreshing user:', error);
      get().logout();
    }
  },

  clearError: () => {
    set({ error: null });
  },
}));

export default useAuthStore;