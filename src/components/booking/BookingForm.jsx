import { useState } from 'react';
import prenotazioniAPI from '../../api/prenotazioni';
import DateRangePicker from './DateRangePicker';

const BookingForm = ({ ombrellone, onSuccess, onCancel }) => {
  const [dateRange, setDateRange] = useState(null);
  const [formData, setFormData] = useState({
    note: '',
    tipoPrenotazione: 'GIORNALIERA'
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!dateRange || !dateRange.dataInizio || !dateRange.dataFine) {
      alert('Seleziona le date');
      return;
    }

    setLoading(true);
    try {
      const prenotazione = await prenotazioniAPI.create({
        ombrelloneId: ombrellone.id,
        dataInizio: dateRange.dataInizio,
        dataFine: dateRange.dataFine,
        tipoPrenotazione: formData.tipoPrenotazione,
        note: formData.note
      });

      alert('Prenotazione creata con successo!');
      if (onSuccess) onSuccess(prenotazione);
    } catch (error) {
      console.error('Error creating prenotazione:', error);
      alert(error.response?.data?.message || 'Errore nella creazione della prenotazione');
    } finally {
      setLoading(false);
    }
  };

  const calculateTotal = () => {
    if (!dateRange || !dateRange.dataInizio || !dateRange.dataFine) return 0;
    const start = new Date(dateRange.dataInizio);
    const end = new Date(dateRange.dataFine);
    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    
    const pricePerDay = {
      STANDARD: 25,
      PREMIUM: 35,
      VIP: 50,
      FAMILY: 40
    }[ombrellone?.tipo] || 25;

    return days * pricePerDay;
  };

  const total = calculateTotal();

  return (
    <div className="space-y-6">
      {/* Ombrellone Info */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-bold mb-3">Ombrellone Selezionato</h3>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xl font-bold">#{ombrellone?.numero} - Fila {ombrellone?.fila}</p>
            <p className="text-gray-600">Tipo: {ombrellone?.tipo}</p>
          </div>
          <span className={`px-4 py-2 rounded-full font-semibold ${
            ombrellone?.tipo === 'VIP' ? 'bg-purple-100 text-purple-700' :
            ombrellone?.tipo === 'PREMIUM' ? 'bg-blue-100 text-blue-700' :
            'bg-gray-100 text-gray-700'
          }`}>
            {ombrellone?.tipo}
          </span>
        </div>
      </div>

      {/* Date Selection */}
      <DateRangePicker onDateChange={setDateRange} />

      {/* Booking Details */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-bold mb-4">Dettagli Prenotazione</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Tipo Prenotazione</label>
            <select
              value={formData.tipoPrenotazione}
              onChange={(e) => setFormData({ ...formData, tipoPrenotazione: e.target.value })}
              className="w-full px-4 py-3 border rounded-lg"
            >
              <option value="GIORNALIERA">Giornaliera</option>
              <option value="SETTIMANALE">Settimanale</option>
              <option value="MENSILE">Mensile</option>
              <option value="STAGIONALE">Stagionale</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Note (opzionale)</label>
            <textarea
              value={formData.note}
              onChange={(e) => setFormData({ ...formData, note: e.target.value })}
              className="w-full px-4 py-3 border rounded-lg"
              rows={3}
              placeholder="Richieste particolari..."
            />
          </div>
        </div>
      </div>

      {/* Summary */}
      {total > 0 && (
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-bold mb-4">Riepilogo</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Ombrellone</span>
              <span className="font-semibold">#{ombrellone?.numero}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Periodo</span>
              <span className="font-semibold">
                {dateRange?.dataInizio && new Date(dateRange.dataInizio).toLocaleDateString('it-IT')} - 
                {dateRange?.dataFine && new Date(dateRange.dataFine).toLocaleDateString('it-IT')}
              </span>
            </div>
            <div className="border-t pt-3 flex justify-between text-xl font-bold">
              <span>Totale</span>
              <span className="text-primary-600">€{total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-4">
        <button
          onClick={handleSubmit}
          disabled={loading || !dateRange || total === 0}
          className="flex-1 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Prenotazione in corso...' : 'Conferma Prenotazione'}
        </button>
        {onCancel && (
          <button
            onClick={onCancel}
            className="px-6 py-3 border rounded-lg hover:bg-gray-50"
          >
            Annulla
          </button>
        )}
      </div>
    </div>
  );
};

export default BookingForm;