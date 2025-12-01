import axiosInstance from './axiosConfig';

const settingsAPI = {
  /**
   * Ottieni impostazioni del tenant
   */
  getTenantSettings: async () => {
    const response = await axiosInstance.get('/tenants/me');
    return response.data;
  },

  /**
   * Aggiorna impostazioni del tenant
   */
  updateTenantSettings: async (data) => {
    const response = await axiosInstance.put('/tenants/me', data);
    return response.data;
  },

  /**
   * Aggiorna tema
   */
  updateTheme: async (themeData) => {
    const response = await axiosInstance.put('/tenants/me/theme', themeData);
    return response.data;
  },

  /**
   * Carica logo
   */
  uploadLogo: async (file) => {
    const formData = new FormData();
    formData.append('logo', file);
    const response = await axiosInstance.post('/tenants/me/logo', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  },

  /**
   * Ottieni configurazione prezzi
   */
  getPricing: async () => {
    const response = await axiosInstance.get('/tenants/me/pricing');
    return response.data;
  },

  /**
   * Aggiorna configurazione prezzi
   */
  updatePricing: async (pricingData) => {
    const response = await axiosInstance.put('/tenants/me/pricing', pricingData);
    return response.data;
  },
};

export default settingsAPI;