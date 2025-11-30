import axiosInstance from './axiosConfig';

const ombrelloniAPI = {
  /**
   * Ottieni tutti gli ombrelloni
   */
  getAll: async () => {
    const response = await axiosInstance.get('/ombrelloni');
    return response.data;
  },

  /**
   * Ottieni solo ombrelloni attivi
   */
  getActive: async () => {
    const response = await axiosInstance.get('/ombrelloni/active');
    return response.data;
  },

  /**
   * Ottieni ombrellone per ID
   */
  getById: async (id) => {
    const response = await axiosInstance.get(`/ombrelloni/${id}`);
    return response.data;
  },

  /**
   * Ottieni ombrelloni per fila
   */
  getByFila: async (fila) => {
    const response = await axiosInstance.get(`/ombrelloni/fila/${fila}`);
    return response.data;
  },

  /**
   * Ottieni ombrelloni per tipo
   */
  getByTipo: async (tipo) => {
    const response = await axiosInstance.get(`/ombrelloni/tipo/${tipo}`);
    return response.data;
  },

  /**
   * Crea nuovo ombrellone (solo admin/staff)
   */
  create: async (data) => {
    const response = await axiosInstance.post('/ombrelloni', data);
    return response.data;
  },

  /**
   * Crea multipli ombrelloni (batch)
   */
  createBatch: async (ombrelloni) => {
    const response = await axiosInstance.post('/ombrelloni/batch', ombrelloni);
    return response.data;
  },

  /**
   * Aggiorna ombrellone
   */
  update: async (id, data) => {
    const response = await axiosInstance.put(`/ombrelloni/${id}`, data);
    return response.data;
  },

  /**
   * Disattiva ombrellone
   */
  deactivate: async (id) => {
    const response = await axiosInstance.post(`/ombrelloni/${id}/deactivate`);
    return response.data;
  },

  /**
   * Attiva ombrellone
   */
  activate: async (id) => {
    const response = await axiosInstance.post(`/ombrelloni/${id}/activate`);
    return response.data;
  },

  /**
   * Elimina ombrellone
   */
  delete: async (id) => {
    const response = await axiosInstance.delete(`/ombrelloni/${id}`);
    return response.data;
  },

  /**
   * Ottieni statistiche
   */
  getStats: async () => {
    const response = await axiosInstance.get('/ombrelloni/stats/count');
    return response.data;
  },
};

export default ombrelloniAPI;