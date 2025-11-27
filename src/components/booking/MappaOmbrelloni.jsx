import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaUmbrella, FaCheck, FaTimes } from 'react-icons/fa';
import ombrelloniAPI from '../../api/ombrelloni';

const MappaOmbrelloni = ({ 
  disponibili = [], 
  onSelectOmbrellone, 
  selectedOmbrellone = null,
  readOnly = false 
}) => {
  const [ombrelloni, setOmbrelloni] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState('grid'); // 'grid' o 'map'

  useEffect(() => {
    loadOmbrelloni();
  }, []);

  const loadOmbrelloni = async () => {
    try {
      const data = await ombrelloniAPI.getActive();
      setOmbrelloni(data);
    } catch (error) {
      console.error('Error loading ombrelloni:', error);
    } finally {
      setLoading(false);
    }
  };

  const isDisponibile = (ombrellone) => {
    if (disponibili.length === 0) return true;
    return disponibili.some(d => d.id === ombrellone.id);
  };

  const isSelected = (ombrellone) => {
    return selectedOmbrellone?.id === ombrellone.id;
  };

  const handleClick = (ombrellone) => {
    if (readOnly) return;
    if (!isDisponibile(ombrellone)) return;
    onSelectOmbrellone?.(ombrellone);
  };

  const getTipoColor = (tipo) => {
    switch (tipo) {
      case 'VIP':
        return 'bg-purple-500';
      case 'PREMIUM':
        return 'bg-blue-500';
      case 'FAMILY':
        return 'bg-green-500';
      default:
        return 'bg-primary-500';
    }
  };

  const getTipoLabel = (tipo) => {
    const labels = {
      'STANDARD': 'Standard',
      'PREMIUM': 'Premium',
      'VIP': 'VIP',
      'FAMILY': 'Family',
    };
    return labels[tipo] || tipo;
  };

  // Raggruppa per fila
  const ombrelloniPerFila = ombrelloni.reduce((acc, ombrellone) => {
    const fila = ombrellone.fila || 'A';
    if (!acc[fila]) acc[fila] = [];
    acc[fila].push(ombrellone);
    return acc;
  }, {});

  const file = Object.keys(ombrelloniPerFila).sort();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header con View Toggle */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold text-gray-900">
            Scegli il tuo ombrellone
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            {disponibili.length > 0 
              ? `${disponibili.length} ombrelloni disponibili`
              : `${ombrelloni.length} ombrelloni totali`
            }
          </p>
        </div>

        {/* View Toggle */}
        <div className="flex gap-2 bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => setView('grid')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition ${
              view === 'grid'
                ? 'bg-white text-primary-600 shadow'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Griglia
          </button>
          <button
            onClick={() => setView('map')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition ${
              view === 'map'
                ? 'bg-white text-primary-600 shadow'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Mappa
          </button>
        </div>
      </div>

      {/* Legenda */}
      <div className="flex flex-wrap gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-primary-500 rounded"></div>
          <span className="text-gray-700">Disponibile</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-300 rounded"></div>
          <span className="text-gray-700">Occupato</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-500 rounded"></div>
          <span className="text-gray-700">Selezionato</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-purple-500 rounded"></div>
          <span className="text-gray-700">VIP</span>
        </div>
      </div>

      {/* Vista Griglia */}
      {view === 'grid' && (
        <div className="space-y-8">
          {file.map((fila) => (
            <div key={fila}>
              <h4 className="text-lg font-semibold text-gray-800 mb-4">
                Fila {fila}
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
                {ombrelloniPerFila[fila]
                  .sort((a, b) => a.numero - b.numero)
                  .map((ombrellone) => {
                    const disponibile = isDisponibile(ombrellone);
                    const selected = isSelected(ombrellone);

                    return (
                      <motion.button
                        key={ombrellone.id}
                        onClick={() => handleClick(ombrellone)}
                        disabled={!disponibile || readOnly}
                        whileHover={disponibile && !readOnly ? { scale: 1.05 } : {}}
                        whileTap={disponibile && !readOnly ? { scale: 0.95 } : {}}
                        className={`
                          relative p-4 rounded-xl transition-all duration-200
                          ${selected
                            ? 'bg-green-500 text-white shadow-lg ring-2 ring-green-600'
                            : disponibile
                            ? `${getTipoColor(ombrellone.tipo)} text-white hover:shadow-lg`
                            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                          }
                        `}
                      >
                        {/* Numero Ombrellone */}
                        <div className="flex flex-col items-center gap-2">
                          <FaUmbrella className="text-2xl" />
                          <span className="text-lg font-bold">
                            {ombrellone.numero}
                          </span>
                          {ombrellone.tipo !== 'STANDARD' && (
                            <span className="text-xs font-medium opacity-90">
                              {getTipoLabel(ombrellone.tipo)}
                            </span>
                          )}
                        </div>

                        {/* Badge Stato */}
                        {selected && (
                          <div className="absolute -top-2 -right-2 bg-white rounded-full p-1">
                            <FaCheck className="text-green-500 text-xs" />
                          </div>
                        )}
                        {!disponibile && (
                          <div className="absolute -top-2 -right-2 bg-white rounded-full p-1">
                            <FaTimes className="text-red-500 text-xs" />
                          </div>
                        )}
                      </motion.button>
                    );
                  })}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Vista Mappa (Posizionamento visuale) */}
      {view === 'map' && (
        <div className="relative bg-gradient-to-b from-sand-100 to-sand-200 rounded-xl p-8 min-h-[600px]">
          {/* Mare (sopra) */}
          <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-primary-400 to-primary-300 rounded-t-xl flex items-center justify-center">
            <span className="text-white font-semibold text-lg">🌊 Mare</span>
          </div>

          {/* Ombrelloni posizionati */}
          <div className="relative mt-32">
            {ombrelloni.map((ombrellone) => {
              const disponibile = isDisponibile(ombrellone);
              const selected = isSelected(ombrellone);

              // Posizionamento basato su posizioneX e posizioneY
              const x = ombrellone.posizioneX || 0;
              const y = ombrellone.posizioneY || 0;

              return (
                <motion.button
                  key={ombrellone.id}
                  onClick={() => handleClick(ombrellone)}
                  disabled={!disponibile || readOnly}
                  whileHover={disponibile && !readOnly ? { scale: 1.1 } : {}}
                  style={{
                    position: 'absolute',
                    left: `${x}%`,
                    top: `${y}%`,
                  }}
                  className={`
                    w-16 h-16 rounded-full flex flex-col items-center justify-center text-xs font-bold
                    transition-all duration-200
                    ${selected
                      ? 'bg-green-500 text-white shadow-2xl ring-4 ring-green-600'
                      : disponibile
                      ? `${getTipoColor(ombrellone.tipo)} text-white hover:shadow-xl`
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }
                  `}
                >
                  <FaUmbrella className="text-lg" />
                  <span>{ombrellone.numero}</span>
                </motion.button>
              );
            })}
          </div>

          {/* Spiaggia (sotto) */}
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-sand-400 to-sand-300 rounded-b-xl flex items-center justify-center">
            <span className="text-gray-700 font-semibold">🏖️ Spiaggia</span>
          </div>
        </div>
      )}

      {/* Ombrellone Selezionato Info */}
      {selectedOmbrellone && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-primary-50 to-sand-50 p-6 rounded-xl border-2 border-primary-200"
        >
          <h4 className="text-lg font-bold text-gray-900 mb-2">
            Ombrellone Selezionato
          </h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-600">Numero:</span>
              <span className="ml-2 font-semibold text-gray-900">
                {selectedOmbrellone.numero}
              </span>
            </div>
            <div>
              <span className="text-gray-600">Fila:</span>
              <span className="ml-2 font-semibold text-gray-900">
                {selectedOmbrellone.fila}
              </span>
            </div>
            <div>
              <span className="text-gray-600">Tipo:</span>
              <span className="ml-2 font-semibold text-gray-900">
                {getTipoLabel(selectedOmbrellone.tipo)}
              </span>
            </div>
            {selectedOmbrellone.descrizione && (
              <div className="col-span-2">
                <span className="text-gray-600">Descrizione:</span>
                <p className="mt-1 text-gray-900">
                  {selectedOmbrellone.descrizione}
                </p>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default MappaOmbrelloni;