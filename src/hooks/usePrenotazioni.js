import { useState, useEffect } from 'react';
import prenotazioniAPI from '../api/prenotazioni';

const usePrenotazioni = (filters = {}, autoLoad = true) => {
  const [prenotazioni, setPrenotazioni] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (autoLoad) {
      loadPrenotazioni();
    }
  }, [autoLoad, JSON.stringify(filters)]);

  const loadPrenotazioni = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await prenotazioniAPI.getAll(filters);
      setPrenotazioni(data);
      return data;
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const createPrenotazione = async (data) => {
    setLoading(true);
    setError(null);
    try {
      const newPrenotazione = await prenotazioniAPI.create(data);
      setPrenotazioni(prev => [newPrenotazione, ...prev]);
      return newPrenotazione;
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const confirmPrenotazione = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const updated = await prenotazioniAPI.confirm(id);
      setPrenotazioni(prev => prev.map(p => p.id === id ? updated : p));
      return updated;
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const markAsPaid = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const updated = await prenotazioniAPI.markAsPaid(id);
      setPrenotazioni(prev => prev.map(p => p.id === id ? updated : p));
      return updated;
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const cancelPrenotazione = async (id, motivo) => {
    setLoading(true);
    setError(null);
    try {
      await prenotazioniAPI.cancel(id, motivo);
      setPrenotazioni(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    prenotazioni,
    loading,
    error,
    loadPrenotazioni,
    createPrenotazione,
    confirmPrenotazione,
    markAsPaid,
    cancelPrenotazione,
  };
};

export default usePrenotazioni;