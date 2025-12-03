const BookingSummary = ({ booking, ombrellone, dateRange }) => {
  const calculateTotal = () => {
    if (!dateRange?.dataInizio || !dateRange?.dataFine) return 0;
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
  const days = dateRange ? Math.ceil((new Date(dateRange.dataFine) - new Date(dateRange.dataInizio)) / (1000 * 60 * 60 * 24)) : 0;

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 sticky top-6">
      <h3 className="text-xl font-bold mb-4">Riepilogo Prenotazione</h3>
      
      <div className="space-y-4">
        {/* Ombrellone */}
        <div className="pb-4 border-b">
          <p className="text-sm text-gray-600 mb-1">Ombrellone</p>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-bold">#{ombrellone?.numero} - Fila {ombrellone?.fila}</p>
              <p className="text-sm text-gray-600">{ombrellone?.tipo}</p>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
              ombrellone?.tipo === 'VIP' ? 'bg-purple-100 text-purple-700' :
              ombrellone?.tipo === 'PREMIUM' ? 'bg-blue-100 text-blue-700' :
              'bg-gray-100 text-gray-700'
            }`}>
              {ombrellone?.tipo}
            </span>
          </div>
        </div>

        {/* Date */}
        {dateRange && (
          <div className="pb-4 border-b">
            <p className="text-sm text-gray-600 mb-2">Periodo</p>
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Check-in:</span>
                <span className="font-semibold">{new Date(dateRange.dataInizio).toLocaleDateString('it-IT')}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Check-out:</span>
                <span className="font-semibold">{new Date(dateRange.dataFine).toLocaleDateString('it-IT')}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Durata:</span>
                <span className="font-semibold">{days} {days === 1 ? 'giorno' : 'giorni'}</span>
              </div>
            </div>
          </div>
        )}

        {/* Pricing */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Prezzo giornaliero</span>
            <span className="font-semibold">€{(total / (days || 1)).toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Numero giorni</span>
            <span className="font-semibold">× {days}</span>
          </div>
        </div>

        {/* Total */}
        <div className="pt-4 border-t">
          <div className="flex justify-between items-center">
            <span className="text-lg font-bold">Totale</span>
            <span className="text-2xl font-bold text-primary-600">€{total.toFixed(2)}</span>
          </div>
        </div>

        {/* Info */}
        <div className="bg-blue-50 rounded-lg p-3">
          <p className="text-xs text-blue-800">
            ℹ️ Il pagamento verrà richiesto al momento della conferma della prenotazione
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookingSummary;