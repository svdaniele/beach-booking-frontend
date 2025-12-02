import { create } from 'zustand';
import authAPI from '../api/auth';

const useAuthStore = create((set) => ({
  user: authAPI.getCurrentUser(),
  token: authAPI.getToken(),
  isAuthenticated: authAPI.isAuthenticated(),

  setUser: (user) => set({ user, isAuthenticated: !!user }),
  
  setToken: (token) => set({ token, isAuthenticated: !!token }),

  login: async (email, password) => {
    const data = await authAPI.login(email, password);
    set({ 
      user: data.user, 
      token: data.token, 
      isAuthenticated: true 
    });
    return data;
  },

  logout: () => {
    authAPI.logout();
    set({ user: null, token: null, isAuthenticated: false });
  },

  checkAuth: () => {
    const isAuth = authAPI.isAuthenticated();
    const currentUser = authAPI.getCurrentUser();
    set({ 
      isAuthenticated: isAuth, 
      user: currentUser,
      token: authAPI.getToken()
    });
  },
}));

export default useAuthStore;