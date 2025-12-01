import axiosInstance from './axiosConfig';

const pagamentiAPI = {
  /**
   * Ottieni tutti i pagamenti
   */
  getAll: async (filters = {}) => {
    const params = new URLSearchParams();
    if (filters.stato) params.append('stato', filters.stato);
    if (filters.metodo) params.append('metodo', filters.metodo);
    if (filters.dataInizio) params.append('dataInizio', filters.dataInizio);
    if (filters.dataFine) params.append('dataFine', filters.dataFine);
    
    const response = await axiosInstance.get(`/pagamenti?${params.toString()}`);
    return response.data;
  },

  /**
   * Ottieni pagamento per ID
   */
  getById: async (id) => {
    const response = await axiosInstance.get(`/pagamenti/${id}`);
    return response.data;
  },

  /**
   * Ottieni pagamenti per prenotazione
   */
  getByPrenotazione: async (prenotazioneId) => {
    const response = await axiosInstance.get(`/pagamenti/prenotazione/${prenotazioneId}`);
    return response.data;
  },

  /**
   * Crea nuovo pagamento
   */
  create: async (data) => {
    const response = await axiosInstance.post('/pagamenti', data);
    return response.data;
  },

  /**
   * Conferma pagamento
   */
  confirm: async (id) => {
    const response = await axiosInstance.put(`/pagamenti/${id}/confirm`);
    return response.data;
  },

  /**
   * Rimborsa pagamento
   */
  refund: async (id, motivo = '') => {
    const response = await axiosInstance.put(`/pagamenti/${id}/refund`, { motivo });
    return response.data;
  },

  /**
   * Ottieni statistiche pagamenti
   */
  getStats: async () => {
    const response = await axiosInstance.get('/pagamenti/stats');
    return response.data;
  },
};

export default pagamentiAPI;