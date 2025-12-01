import axiosInstance from './axiosConfig';

const profileAPI = {
  /**
   * Ottieni profilo utente corrente
   */
  getMe: async () => {
    const response = await axiosInstance.get('/users/me');
    return response.data;
  },

  /**
   * Aggiorna profilo utente
   */
  updateProfile: async (data) => {
    const response = await axiosInstance.put('/users/me', data);
    return response.data;
  },

  /**
   * Cambia password
   */
  changePassword: async (currentPassword, newPassword) => {
    const response = await axiosInstance.put('/users/me/password', {
      currentPassword,
      newPassword
    });
    return response.data;
  },

  /**
   * Carica avatar
   */
  uploadAvatar: async (file) => {
    const formData = new FormData();
    formData.append('avatar', file);
    const response = await axiosInstance.post('/users/me/avatar', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  },

  /**
   * Aggiorna preferenze notifiche
   */
  updatePreferences: async (preferences) => {
    const response = await axiosInstance.put('/users/me/preferences', preferences);
    return response.data;
  },

  /**
   * Ottieni sessioni attive
   */
  getSessions: async () => {
    const response = await axiosInstance.get('/users/me/sessions');
    return response.data;
  },

  /**
   * Termina sessione
   */
  terminateSession: async (sessionId) => {
    const response = await axiosInstance.delete(`/users/me/sessions/${sessionId}`);
    return response.data;
  },
};

export default profileAPI;