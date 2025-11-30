import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaCalendarPlus, FaUmbrella, FaMapMarkerAlt, FaTimes } from 'react-icons/fa';
import { format } from 'date-fns';
import { it } from 'date-fns/locale';
import prenotazioniAPI from '../../api/prenotazioni';

const MyPrenotazioni = () => {
  const [prenotazioni, setPrenotazioni] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, active, past

  useEffect(() => {
    loadPrenotazioni();
  }, []);

  const loadPrenotazioni = async () => {
    try {
      const data = await prenotazioniAPI.getMy();
      setPrenotazioni(data);
    } catch (error) {
      console.error('Error loading prenotazioni:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (id) => {
    if (!confirm('Sei sicuro di voler cancellare questa prenotazione?')) return;

    try {
      await prenotazioniAPI.cancel(id, 'Cancellata dal cliente');
      loadPrenotazioni();
    } catch (error) {
      console.error('Error canceling:', error);
      alert('Errore durante la cancellazione');
    }
  };

  const filteredPrenotazioni = prenotazioni.filter((p) => {
    const today = new Date();
    const dataFine = new Date(p.dataFine);
    
    if (filter === 'active') {
      return dataFine >= today && p.stato !== 'CANCELLED';
    }
    if (filter === 'past') {
      return dataFine < today || p.stato === 'CANCELLED';
    }
    return true;
  });

  const getStatoColor = (stato) => {
    switch (stato) {
      case 'PAID':
      case 'COMPLETED':
        return 'bg-green-100 text-green-700';
      case 'CONFIRMED':
        return 'bg-blue-100 text-blue-700';
      case 'PENDING':
        return 'bg-orange-100 text-orange-700';
      case 'CANCELLED':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Le Mie Prenotazioni
          </h1>
          <p className="text-gray-600 mt-1">
            Gestisci le tue prenotazioni
          </p>
        </div>
        <Link
          to="/booking"
          className="flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition"
        >
          <FaCalendarPlus />
          Nuova Prenotazione
        </Link>
      </div>

      {/* Filters */}
      <div className="flex gap-2">
        {[
          { value: 'all', label: 'Tutte' },
          { value: 'active', label: 'Attive' },
          { value: 'past', label: 'Passate' },
        ].map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              filter === f.value
                ? 'bg-primary-600 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Prenotazioni List */}
      {filteredPrenotazioni.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-12 text-center">
          <FaUmbrella className="text-6xl text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Nessuna prenotazione trovata
          </h3>
          <p className="text-gray-600 mb-6">
            Inizia a prenotare il tuo ombrellone preferito!
          </p>
          <Link
            to="/booking"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition"
          >
            <FaCalendarPlus />
            Prenota Ora
          </Link>
        </div>
      ) : (
        <div className="grid gap-6">
          {filteredPrenotazioni.map((prenotazione) => {
            const isPast = new Date(prenotazione.dataFine) < new Date();
            const canCancel = !isPast && prenotazione.stato !== 'CANCELLED';

            return (
              <motion.div
                key={prenotazione.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatoColor(prenotazione.stato)}`}>
                          {prenotazione.statoDescrizione}
                        </span>
                        <span className="text-sm text-gray-500">
                          {prenotazione.codicePrenotazione}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1">
                        Ombrellone #{prenotazione.ombrelloneNumero || 'N/A'}
                      </h3>
                      {prenotazione.ombrelloneFila && (
                        <p className="text-gray-600 flex items-center gap-2">
                          <FaMapMarkerAlt className="text-primary-600" />
                          Fila {prenotazione.ombrelloneFila}
                        </p>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-bold text-primary-600">
                        €{prenotazione.prezzoTotale}
                      </p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4 mb-4 p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Data Inizio</p>
                      <p className="font-semibold text-gray-900">
                        {format(new Date(prenotazione.dataInizio), 'dd MMM yyyy', { locale: it })}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Data Fine</p>
                      <p className="font-semibold text-gray-900">
                        {format(new Date(prenotazione.dataFine), 'dd MMM yyyy', { locale: it })}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Durata</p>
                      <p className="font-semibold text-gray-900">
                        {prenotazione.numeroGiorni} giorni
                      </p>
                    </div>
                  </div>

                  {prenotazione.note && (
                    <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm text-gray-700">
                        <strong>Note:</strong> {prenotazione.note}
                      </p>
                    </div>
                  )}

                  {canCancel && (
                    <div className="flex justify-end">
                      <button
                        onClick={() => handleCancel(prenotazione.id)}
                        className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                      >
                        <FaTimes />
                        Cancella Prenotazione
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyPrenotazioni;