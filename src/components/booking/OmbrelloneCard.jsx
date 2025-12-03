const OmbrelloneCard = ({ ombrellone, onSelect, selected = false }) => {
  const getTipoColor = (tipo) => {
    const colors = {
      VIP: 'bg-purple-100 text-purple-700 border-purple-300',
      PREMIUM: 'bg-blue-100 text-blue-700 border-blue-300',
      FAMILY: 'bg-green-100 text-green-700 border-green-300',
      STANDARD: 'bg-gray-100 text-gray-700 border-gray-300'
    };
    return colors[tipo] || colors.STANDARD;
  };

  const getTipoPrice = (tipo) => {
    const prices = { VIP: 50, PREMIUM: 35, FAMILY: 40, STANDARD: 25 };
    return prices[tipo] || 25;
  };

  return (
    <div
      onClick={() => onSelect && onSelect(ombrellone)}
      className={`bg-white rounded-xl shadow-sm p-6 transition-all cursor-pointer ${
        selected 
          ? 'border-2 border-primary-600 shadow-lg' 
          : 'border-2 border-transparent hover:border-primary-300 hover:shadow-md'
      }`}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-2xl font-bold text-gray-900">#{ombrellone.numero}</h3>
          <p className="text-sm text-gray-600">Fila {ombrellone.fila}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getTipoColor(ombrellone.tipo)}`}>
          {ombrellone.tipo}
        </span>
      </div>

      {ombrellone.descrizione && (
        <p className="text-sm text-gray-600 mb-4">{ombrellone.descrizione}</p>
      )}

      <div className="flex items-center justify-between pt-4 border-t">
        <div>
          <p className="text-xs text-gray-500">Da</p>
          <p className="text-xl font-bold text-primary-600">€{getTipoPrice(ombrellone.tipo)}</p>
          <p className="text-xs text-gray-500">al giorno</p>
        </div>
        <button 
          className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
            selected
              ? 'bg-primary-600 text-white'
              : 'bg-primary-50 text-primary-600 hover:bg-primary-100'
          }`}
        >
          {selected ? '✓ Selezionato' : 'Seleziona'}
        </button>
      </div>
    </div>
  );
};

export default OmbrelloneCard;