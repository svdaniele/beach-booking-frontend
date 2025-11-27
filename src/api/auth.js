import axios from './axios';

const authAPI = {
  /**
   * Login utente
   */
  login: async (email, password) => {
    const response = await axios.post('/auth/login', {
      email,
      password,
    });
    return response.data;
  },

  /**
   * Registrazione cliente
   */
  registerCustomer: async (data) => {
    const response = await axios.post('/auth/register/customer', data);
    return response.data;
  },

  /**
   * Registrazione nuovo tenant (stabilimento)
   */
  registerTenant: async (data) => {
    const response = await axios.post('/auth/register/tenant', data);
    return response.data;
  },

  /**
   * Ottieni utente corrente
   */
  getCurrentUser: async () => {
    const response = await axios.get('/auth/me');
    return response.data;
  },

  /**
   * Logout
   */
  logout: async () => {
    const response = await axios.post('/auth/logout');
    return response.data;
  },

  /**
   * Richiedi reset password
   */
  forgotPassword: async (email) => {
    const response = await axios.post('/auth/forgot-password', { email });
    return response.data;
  },

  /**
   * Reset password con token
   */
  resetPassword: async (token, newPassword) => {
    const response = await axios.post('/auth/reset-password', {
      token,
      newPassword,
    });
    return response.data;
  },

  /**
   * Cambia password (utente autenticato)
   */
  changePassword: async (oldPassword, newPassword, confirmPassword) => {
    const response = await axios.post('/auth/change-password', {
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
    const response = await axios.post('/auth/verify-email', { token });
    return response.data;
  },
};

export default authAPI;