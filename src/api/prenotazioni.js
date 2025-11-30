import axiosInstance from './axiosConfig';

const prenotazioniAPI = {
  /**
   * Crea nuova prenotazione
   */
  create: async (data) => {
    const response = await axiosInstance.post('/prenotazioni', data);
    return response.data;
  },

  /**
   * Ottieni tutte le prenotazioni
   */
  getAll: async (filters = {}) => {
    const params = new URLSearchParams();
    if (filters.stato) params.append('stato', filters.stato);
    if (filters.dataInizio) params.append('dataInizio', filters.dataInizio);
    if (filters.dataFine) params.append('dataFine', filters.dataFine);
    
    const response = await axiosInstance.get(`/prenotazioni?${params.toString()}`);
    return response.data;
  },

  /**
   * Ottieni le mie prenotazioni
   */
  getMy: async () => {
    const response = await axiosInstance.get('/prenotazioni/me');
    return response.data;
  },

  /**
   * Ottieni prenotazioni attive (oggi)
   */
  getActive: async () => {
    const response = await axiosInstance.get('/prenotazioni/active');
    return response.data;
  },

  /**
   * Ottieni prenotazione per ID
   */
  getById: async (id) => {
    const response = await axiosInstance.get(`/prenotazioni/${id}`);
    return response.data;
  },

  /**
   * Ottieni prenotazione per codice
   */
  getByCodice: async (codice) => {
    const response = await axiosInstance.get(`/prenotazioni/codice/${codice}`);
    return response.data;
  },

  /**
   * Ottieni ombrelloni disponibili in un periodo
   */
  getDisponibili: async (dataInizio, dataFine) => {
    const params = new URLSearchParams({
      dataInizio,
      dataFine,
    });
    const response = await axiosInstance.get(`/prenotazioni/disponibili?${params.toString()}`);
    return response.data;
  },

  /**
   * Conferma prenotazione (staff)
   */
  confirm: async (id) => {
    const response = await axiosInstance.put(`/prenotazioni/${id}/confirm`);
    return response.data;
  },

  /**
   * Marca come pagata (staff)
   */
  markAsPaid: async (id) => {
    const response = await axiosInstance.put(`/prenotazioni/${id}/pay`);
    return response.data;
  },

  /**
   * Completa prenotazione (staff)
   */
  complete: async (id) => {
    const response = await axiosInstance.put(`/prenotazioni/${id}/complete`);
    return response.data;
  },

  /**
   * Cancella prenotazione
   */
  cancel: async (id, motivo = '') => {
    const params = motivo ? `?motivo=${encodeURIComponent(motivo)}` : '';
    const response = await axiosInstance.delete(`/prenotazioni/${id}${params}`);
    return response.data;
  },

  /**
   * Ottieni statistiche
   */
  getStats: async () => {
    const response = await axiosInstance.get('/prenotazioni/stats');
    return response.data;
  },
};

export default prenotazioniAPI;