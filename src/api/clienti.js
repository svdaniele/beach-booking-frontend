import axiosInstance from './axiosConfig';

const clientiAPI = {
  /**
   * Ottieni tutti i clienti del tenant
   */
  getAll: async (search = '') => {
    const params = search ? `?search=${encodeURIComponent(search)}` : '';
    const response = await axiosInstance.get(`/users/clienti${params}`);
    return response.data;
  },

  /**
   * Ottieni cliente per ID
   */
  getById: async (id) => {
    const response = await axiosInstance.get(`/users/${id}`);
    return response.data;
  },

  /**
   * Crea nuovo cliente
   */
  create: async (data) => {
    const response = await axiosInstance.post('/auth/register', {
      ...data,
      ruolo: 'CUSTOMER'
    });
    return response.data;
  },

  /**
   * Aggiorna cliente
   */
  update: async (id, data) => {
    const response = await axiosInstance.put(`/users/${id}`, data);
    return response.data;
  },

  /**
   * Elimina cliente
   */
  delete: async (id) => {
    const response = await axiosInstance.delete(`/users/${id}`);
    return response.data;
  },

  /**
   * Ottieni prenotazioni del cliente
   */
  getPrenotazioni: async (id) => {
    const response = await axiosInstance.get(`/users/${id}/prenotazioni`);
    return response.data;
  },

  /**
   * Ottieni statistiche clienti
   */
  getStats: async () => {
    const response = await axiosInstance.get('/users/clienti/stats');
    return response.data;
  },
};

export default clientiAPI;