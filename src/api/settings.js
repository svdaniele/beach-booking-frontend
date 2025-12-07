import axiosInstance from './axiosConfig';

const settingsAPI = {
  /**
   * Ottieni impostazioni del tenant
   */
  getTenantSettings: async () => {
    //const response = await axiosInstance.get('/auth/me');
    const response = await axiosInstance.get('/tenants/current');
    return response.data;
  },

  /**
   * Aggiorna impostazioni del tenant
   */
  /*updateTenantSettings: async (data) => {
    const response = await axiosInstance.put('/auth/me', data);
    return response.data;
  },*/
  updateTenantSettings: async (tenantId, data) => {
    const response = await axiosInstance.put(`/tenants/${tenantId}`, data);
    return response.data;
  },


  /**
   * Aggiorna tema
   */
  updateTheme: async (themeData) => {
    const response = await axiosInstance.put('/auth/me/theme', themeData);
    return response.data;
  },

  /**
   * Carica logo
   */
  uploadLogo: async (file) => {
    const formData = new FormData();
    formData.append('logo', file);
    const response = await axiosInstance.post('/auth/me/logo', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  },

  /**
   * Ottieni configurazione prezzi
   */
  getPricing: async () => {
    const response = await axiosInstance.get('/auth/me/pricing');
    return response.data;
  },

  /**
   * Aggiorna configurazione prezzi
   */
  updatePricing: async (pricingData) => {
    const response = await axiosInstance.put('/auth/me/pricing', pricingData);
    return response.data;
  },
};

export default settingsAPI;