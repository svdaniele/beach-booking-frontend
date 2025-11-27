import axios from './axios';

const ombrelloniAPI = {
  /**
   * Ottieni tutti gli ombrelloni
   */
  getAll: async () => {
    const response = await axios.get('/ombrelloni');
    return response.data;
  },

  /**
   * Ottieni solo ombrelloni attivi
   */
  getActive: async () => {
    const response = await axios.get('/ombrelloni/active');
    return response.data;
  },

  /**
   * Ottieni ombrellone per ID
   */
  getById: async (id) => {
    const response = await axios.get(`/ombrelloni/${id}`);
    return response.data;
  },

  /**
   * Ottieni ombrelloni per fila
   */
  getByFila: async (fila) => {
    const response = await axios.get(`/ombrelloni/fila/${fila}`);
    return response.data;
  },

  /**
   * Ottieni ombrelloni per tipo
   */
  getByTipo: async (tipo) => {
    const response = await axios.get(`/ombrelloni/tipo/${tipo}`);
    return response.data;
  },

  /**
   * Crea nuovo ombrellone (solo admin/staff)
   */
  create: async (data) => {
    const response = await axios.post('/ombrelloni', data);
    return response.data;
  },

  /**
   * Crea multipli ombrelloni (batch)
   */
  createBatch: async (ombrelloni) => {
    const response = await axios.post('/ombrelloni/batch', ombrelloni);
    return response.data;
  },

  /**
   * Aggiorna ombrellone
   */
  update: async (id, data) => {
    const response = await axios.put(`/ombrelloni/${id}`, data);
    return response.data;
  },

  /**
   * Disattiva ombrellone
   */
  deactivate: async (id) => {
    const response = await axios.post(`/ombrelloni/${id}/deactivate`);
    return response.data;
  },

  /**
   * Attiva ombrellone
   */
  activate: async (id) => {
    const response = await axios.post(`/ombrelloni/${id}/activate`);
    return response.data;
  },

  /**
   * Elimina ombrellone
   */
  delete: async (id) => {
    const response = await axios.delete(`/ombrelloni/${id}`);
    return response.data;
  },

  /**
   * Ottieni statistiche
   */
  getStats: async () => {
    const response = await axios.get('/ombrelloni/stats/count');
    return response.data;
  },
};

export default ombrelloniAPI;