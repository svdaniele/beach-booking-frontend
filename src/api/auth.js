import axiosInstance from './axiosConfig';

const authAPI = {
  

  /**
   * Registrazione cliente
   */
  registerCustomer: async (data) => {
    const response = await axiosInstance.post('/auth/register/customer', data);
    return response.data;
  },

  /**
   * Registrazione nuovo tenant (stabilimento)
   */
  registerTenant: async (data) => {
    const response = await axiosInstance.post('/auth/register/tenant', data);
    return response.data;
  },

  /**
   * Ottieni utente corrente
   */
  /*
  getCurrentUser: async () => {
    const response = await axiosInstance.get('/auth/me');
    return response.data;
  },
  */

  /**
   * Logout
   */
  logout: async () => {
    const response = await axiosInstance.post('/auth/logout');

    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return response.data;
  },

  /**
   * Richiedi reset password
   */
  forgotPassword: async (email) => {
    const response = await axiosInstance.post('/auth/forgot-password', { email });
    return response.data;
  },

  /**
   * Reset password con token
   */
  resetPassword: async (token, newPassword) => {
    const response = await axiosInstance.post('/auth/reset-password', {
      token,
      newPassword,
    });
    return response.data;
  },

  /**
   * Cambia password (utente autenticato)
   */
  changePassword: async (oldPassword, newPassword, confirmPassword) => {
    const response = await axiosInstance.post('/auth/change-password', {
      oldPassword,
      newPassword,
      confirmPassword,
    });
    return response.data;
  },

  /**
   * Verifica email
   */
  verifyEmail: async (token) => {
    const response = await axiosInstance.post('/auth/verify-email', { token });
    return response.data;
  },

  //integrazione 
  /**
   * Login
   */
  login: async (email, password) => {
    const response = await axiosInstance.post('/auth/login', { email, password });
    if (response.data.token) {
      response.data.user.tenantId = response.data.tenantId;

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },


  /**
   * Get current user
   */
  getCurrentUser: () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  /**
   * Get token
   */
  getToken: () => {
    return localStorage.getItem('token');
  },

  /**
   * Check if authenticated
   */
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },
};

export default authAPI;