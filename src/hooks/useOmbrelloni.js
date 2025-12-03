import { useState, useEffect } from 'react';
import ombrelloniAPI from '../api/ombrelloni';

const useOmbrelloni = (autoLoad = true) => {
  const [ombrelloni, setOmbrelloni] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (autoLoad) {
      loadOmbrelloni();
    }
  }, [autoLoad]);

  const loadOmbrelloni = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await ombrelloniAPI.getAll();
      setOmbrelloni(data);
      return data;
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const createOmbrellone = async (data) => {
    setLoading(true);
    setError(null);
    try {
      const newOmbrellone = await ombrelloniAPI.create(data);
      setOmbrelloni(prev => [...prev, newOmbrellone]);
      return newOmbrellone;
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateOmbrellone = async (id, data) => {
    setLoading(true);
    setError(null);
    try {
      const updated = await ombrelloniAPI.update(id, data);
      setOmbrelloni(prev => prev.map(o => o.id === id ? updated : o));
      return updated;
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteOmbrellone = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await ombrelloniAPI.delete(id);
      setOmbrelloni(prev => prev.filter(o => o.id !== id));
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    ombrelloni,
    loading,
    error,
    loadOmbrelloni,
    createOmbrellone,
    updateOmbrellone,
    deleteOmbrellone,
  };
};

export default useOmbrelloni;