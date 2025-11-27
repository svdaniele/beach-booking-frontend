import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCalendar, FaUmbrella, FaEuroSign } from 'react-icons/fa';
import { format, differenceInDays, addDays } from 'date-fns';
import { it } from 'date-fns/locale';
import prenotazioniAPI from '../../api/prenotazioni';
import useAuthStore from '../../store/authStore';

const BookingForm = ({ ombrellone, onSuccess, onCancel }) => {
  const { user } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const [formData, setFormData] = useState({
    dataInizio: format(new Date(), 'yyyy-MM-dd'),
    dataFine: format(addDays(new Date(), 7), 'yyyy-MM-dd'),
    tipoPrenotazione: 'SETTIMANALE',
    note: '',
  });

  // Calcola prezzo
  const calcolaPrezzo = () => {
    if (!formData.dataInizio || !formData.dataFine) return 0;
    
    const giorni = differenceInDays(
      new Date(formData.dataFine),
      new Date(formData.dataInizio)
    ) + 1;
    
    const prezzoBase = 30; // €30 al giorno base
    let moltiplicatore = 1;
    
    // Moltiplicatore per tipo ombrellone
    switch (ombrellone?.tipo) {
      case 'PREMIUM':
        moltiplicatore = 1.5;
        break;
      case 'VIP':
        moltiplicatore = 2.0;
        break;
      case 'FAMILY':
        moltiplicatore = 1.8;
        break;
      default:
        moltiplicatore = 1.0;
    }
    
    let prezzo = prezzoBase * giorni * moltiplicatore;
    
    // Sconti per tipo prenotazione
    switch (formData.tipoPrenotazione) {
      case 'SETTIMANALE':
        prezzo *= 0.9; // 10% sconto
        break;
      case 'MENSILE':
        prezzo *= 0.8; // 20% sconto
        break;
      case 'ANNUALE':
        prezzo *= 0.6; // 40% sconto
        break;
    }
    
    return prezzo.toFixed(2);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const prenotazione = await prenotazioniAPI.create({
        ombrelloneId: ombrellone.id,
        dataInizio: formData.dataInizio,
        dataFine: formData.dataFine,
        tipoPrenotazione: formData.tipoPrenotazione,
        note: formData.note,
      });

      onSuccess?.(prenotazione);
    } catch (err) {
      setError(err.response?.data?.message || 'Errore durante la prenotazione');
    } finally {
      setLoading(false);
    }
  };

  const numeroGiorni = differenceInDays(
    new Date(formData.dataFine),
    new Date(formData.dataInizio)
  ) + 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-xl p-6 max-w-2xl mx-auto"
    >
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Completa la Prenotazione
        </h3>
        <p className="text-gray-600">
          Ombrellone {ombrellone.numero} - Fila {ombrellone.fila}
        </p>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="mb-4 bg-red-50 border-l-4 border-red-500 p-4 rounded">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Date */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <FaCalendar className="inline mr-2" />
              Data Inizio
            </label>
            <input
              type="date"
              name="dataInizio"
              value={formData.dataInizio}
              onChange={handleChange}
              min={format(new Date(), 'yyyy-MM-dd')}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <FaCalendar className="inline mr-2" />
              Data Fine
            </label>
            <input
              type="date"
              name="dataFine"
              value={formData.dataFine}
              onChange={handleChange}
              min={formData.dataInizio}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Tipo Prenotazione */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tipo Prenotazione
          </label>
          <select
            name="tipoPrenotazione"
            value={formData.tipoPrenotazione}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="GIORNALIERA">Giornaliera</option>
            <option value="SETTIMANALE">Settimanale (-10%)</option>
            <option value="MENSILE">Mensile (-20%)</option>
            <option value="ANNUALE">Annuale (-40%)</option>
          </select>
        </div>

        {/* Note */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Note (opzionale)
          </label>
          <textarea
            name="note"
            value={formData.note}
            onChange={handleChange}
            rows={3}
            placeholder="Eventuali richieste o preferenze..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        {/* Riepilogo */}
        <div className="bg-gradient-to-r from-primary-50 to-sand-50 p-6 rounded-xl">
          <h4 className="font-bold text-gray-900 mb-4">Riepilogo</h4>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Ombrellone:</span>
              <span className="font-semibold">
                N° {ombrellone.numero} ({ombrellone.tipo})
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Periodo:</span>
              <span className="font-semibold">
                {format(new Date(formData.dataInizio), 'dd MMM', { locale: it })} - 
                {format(new Date(formData.dataFine), 'dd MMM yyyy', { locale: it })}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Giorni:</span>
              <span className="font-semibold">{numeroGiorni}</span>
            </div>
            <div className="flex justify-between items-center pt-3 border-t border-primary-200">
              <span className="text-lg font-bold text-gray-900">
                Totale:
              </span>
              <span className="text-2xl font-bold text-primary-600">
                <FaEuroSign className="inline text-lg" /> {calcolaPrezzo()}
              </span>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition"
          >
            Annulla
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex-1 px-6 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Elaborazione...
              </span>
            ) : (
              'Conferma Prenotazione'
            )}
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default BookingForm;