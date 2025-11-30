import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaCheck, FaTimes, FaEuroSign, FaSearch } from 'react-icons/fa';
import { format } from 'date-fns';
import { it } from 'date-fns/locale';
import prenotazioniAPI from '../../api/prenotazioni';

const Prenotazioni = () => {
  const [prenotazioni, setPrenotazioni] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  useEffect(() => {
    loadPrenotazioni();
  }, [filter]);

  const loadPrenotazioni = async () => {
    setLoading(true);
    try {
      const filters = filter !== 'all' ? { stato: filter } : {};
      const data = await prenotazioniAPI.getAll(filters);
      setPrenotazioni(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = async (id) => {
    try {
      await prenotazioniAPI.confirm(id);
      loadPrenotazioni();
    } catch (error) {
      alert('Errore');
    }
  };

  const handleMarkPaid = async (id) => {
    try {
      await prenotazioniAPI.markAsPaid(id);
      loadPrenotazioni();
    } catch (error) {
      alert('Errore');
    }
  };

  const handleCancel = async (id) => {
    if (!confirm('Cancellare?')) return;
    try {
      await prenotazioniAPI.cancel(id, 'Cancellata da admin');
      loadPrenotazioni();
    } catch (error) {
      alert('Errore');
    }
  };

  const filtered = prenotazioni.filter(p => 
    p.codicePrenotazione?.toLowerCase().includes(search.toLowerCase()) ||
    p.userEmail?.toLowerCase().includes(search.toLowerCase())
  );

  const getStatoColor = (stato) => {
    const colors = {
      PENDING: 'bg-orange-100 text-orange-700',
      CONFIRMED: 'bg-blue-100 text-blue-700',
      PAID: 'bg-green-100 text-green-700',
      CANCELLED: 'bg-red-100 text-red-700',
    };
    return colors[stato] || 'bg-gray-100 text-gray-700';
  };

  if (loading) {
    return <div className="flex justify-center items-center h-96"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div></div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Gestione Prenotazioni</h1>
      </div>

      {/* Filters & Search */}
      <div className="flex gap-4">
        <div className="flex gap-2">
          {['all', 'PENDING', 'CONFIRMED', 'PAID'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                filter === f ? 'bg-primary-600 text-white' : 'bg-white text-gray-600'
              }`}
            >
              {f === 'all' ? 'Tutte' : f}
            </button>
          ))}
        </div>
        <div className="flex-1 relative">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Cerca per codice..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Codice</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ombrellone</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Prezzo</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stato</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Azioni</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filtered.map(p => (
              <tr key={p.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{p.codicePrenotazione}</td>
                <td className="px-6 py-4 text-sm text-gray-600">#{p.ombrelloneNumero}</td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {format(new Date(p.dataInizio), 'dd/MM', { locale: it })} - {format(new Date(p.dataFine), 'dd/MM', { locale: it })}
                </td>
                <td className="px-6 py-4 text-sm font-semibold text-gray-900">€{p.prezzoTotale}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatoColor(p.stato)}`}>
                    {p.stato}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm">
                  <div className="flex gap-2">
                    {p.stato === 'PENDING' && (
                      <button onClick={() => handleConfirm(p.id)} className="text-blue-600 hover:text-blue-700">
                        <FaCheck />
                      </button>
                    )}
                    {p.stato === 'CONFIRMED' && (
                      <button onClick={() => handleMarkPaid(p.id)} className="text-green-600 hover:text-green-700">
                        <FaEuroSign />
                      </button>
                    )}
                    {p.stato !== 'CANCELLED' && (
                      <button onClick={() => handleCancel(p.id)} className="text-red-600 hover:text-red-700">
                        <FaTimes />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Prenotazioni;