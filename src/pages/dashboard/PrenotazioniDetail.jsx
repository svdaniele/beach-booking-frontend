import { useState, useEffect } from 'react';
import prenotazioniAPI from '../../api/prenotazioni';

const PrenotazioneDetail = ({ prenotazioneId, onBack }) => {
  const [prenotazione, setPrenotazione] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (prenotazioneId) {
      loadPrenotazione();
    }
  }, [prenotazioneId]);

  const loadPrenotazione = async () => {
    try {
      const data = await prenotazioniAPI.getById(prenotazioneId);
      setPrenotazione(data);
    } catch (error) {
      console.error('Error loading prenotazione:', error);
      alert('Errore nel caricamento della prenotazione');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (action) => {
    try {
      switch (action) {
        case 'CONFIRM':
          await prenotazioniAPI.confirm(prenotazioneId);
          break;
        case 'PAY':
          await prenotazioniAPI.markAsPaid(prenotazioneId);
          break;
        case 'COMPLETE':
          await prenotazioniAPI.complete(prenotazioneId);
          break;
        case 'CANCEL':
          const motivo = prompt('Motivo della cancellazione:');
          if (!motivo) return;
          await prenotazioniAPI.cancel(prenotazioneId, motivo);
          break;
      }
      loadPrenotazione();
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Errore nell\'aggiornamento dello stato');
    }
  };

  const handleDelete = async () => {
    if (!confirm('Eliminare definitivamente questa prenotazione?')) return;
    try {
      await prenotazioniAPI.cancel(prenotazioneId, 'Eliminata dall\'admin');
      alert('Prenotazione eliminata');
      if (onBack) onBack();
    } catch (error) {
      console.error('Error deleting prenotazione:', error);
      alert('Errore nell\'eliminazione');
    }
  };

  const getStatusBadge = (status) => {
    const config = {
      CONFIRMED: 'bg-green-100 text-green-700',
      PENDING: 'bg-yellow-100 text-yellow-700',
      CANCELLED: 'bg-red-100 text-red-700',
      COMPLETED: 'bg-blue-100 text-blue-700',
      PAID: 'bg-purple-100 text-purple-700'
    };
    return config[status] || 'bg-gray-100 text-gray-700';
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!prenotazione) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Prenotazione non trovata</p>
        {onBack && (
          <button onClick={onBack} className="mt-4 px-6 py-2 bg-primary-600 text-white rounded-lg">
            Torna alla lista
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {onBack && (
            <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-lg">
              ← Indietro
            </button>
          )}
          <div>
            <h1 className="text-3xl font-bold">Prenotazione #{prenotazione.id}</h1>
            <p className="text-gray-600 mt-1">
              Codice: <span className="font-mono font-semibold">{prenotazione.codicePrenotazione}</span>
            </p>
            <p className="text-gray-600 text-sm">
              Creata il {new Date(prenotazione.createdAt).toLocaleDateString('it-IT')}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 border rounded-lg hover:bg-gray-50">
            🖨️ Stampa
          </button>
          <button className="px-4 py-2 border rounded-lg hover:bg-gray-50">
            ✉️ Email
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            🗑️ Elimina
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="md:col-span-2 space-y-6">
          {/* Info Cliente */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-bold mb-4">Informazioni Cliente</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Nome Completo</p>
                <p className="font-semibold">
                  {prenotazione.user?.nome} {prenotazione.user?.cognome}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-semibold">{prenotazione.user?.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Telefono</p>
                <p className="font-semibold">{prenotazione.user?.telefono || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Codice Fiscale</p>
                <p className="font-semibold">{prenotazione.user?.codiceFiscale || 'N/A'}</p>
              </div>
            </div>
          </div>

          {/* Dettagli Prenotazione */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-bold mb-4">Dettagli Prenotazione</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Ombrellone</p>
                <p className="font-semibold">
                  #{prenotazione.ombrellone?.numero} - Fila {prenotazione.ombrellone?.fila}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Tipo</p>
                <p className="font-semibold">{prenotazione.ombrellone?.tipo}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Data Inizio</p>
                <p className="font-semibold">
                  {new Date(prenotazione.dataInizio).toLocaleDateString('it-IT')}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Data Fine</p>
                <p className="font-semibold">
                  {new Date(prenotazione.dataFine).toLocaleDateString('it-IT')}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Tipo Prenotazione</p>
                <p className="font-semibold">{prenotazione.tipoPrenotazione}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Numero Giorni</p>
                <p className="font-semibold">
                  {Math.ceil((new Date(prenotazione.dataFine) - new Date(prenotazione.dataInizio)) / (1000 * 60 * 60 * 24))}
                </p>
              </div>
            </div>
            {prenotazione.note && (
              <div className="mt-4">
                <p className="text-sm text-gray-600">Note</p>
                <p className="font-semibold">{prenotazione.note}</p>
              </div>
            )}
          </div>

          {/* Pagamento */}
          {prenotazione.pagamento && (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold mb-4">Dettagli Pagamento</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Importo</p>
                  <p className="font-bold text-xl">€{prenotazione.pagamento.importo?.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Metodo</p>
                  <p className="font-semibold">{prenotazione.pagamento.metodoPagamento}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Stato Pagamento</p>
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${getStatusBadge(prenotazione.pagamento.stato)}`}>
                    {prenotazione.pagamento.stato}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Data Pagamento</p>
                  <p className="font-semibold">
                    {new Date(prenotazione.pagamento.createdAt).toLocaleDateString('it-IT')}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Stato */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-bold mb-4">Stato Prenotazione</h2>
            <span className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${getStatusBadge(prenotazione.stato)}`}>
              {prenotazione.stato}
            </span>
            <div className="mt-4 space-y-2">
              {prenotazione.stato === 'PENDING' && (
                <button
                  onClick={() => handleStatusChange('CONFIRM')}
                  className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  ✓ Conferma Prenotazione
                </button>
              )}
              {prenotazione.stato === 'CONFIRMED' && !prenotazione.pagamento?.stato?.includes('PAID') && (
                <button
                  onClick={() => handleStatusChange('PAY')}
                  className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                >
                  💳 Marca come Pagata
                </button>
              )}
              {prenotazione.stato !== 'COMPLETED' && prenotazione.stato !== 'CANCELLED' && (
                <button
                  onClick={() => handleStatusChange('COMPLETE')}
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  ✓ Completa
                </button>
              )}
              {prenotazione.stato !== 'CANCELLED' && (
                <button
                  onClick={() => handleStatusChange('CANCEL')}
                  className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  ✕ Cancella
                </button>
              )}
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-bold mb-4">Cronologia</h2>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                <div>
                  <p className="font-semibold">Prenotazione creata</p>
                  <p className="text-sm text-gray-600">
                    {new Date(prenotazione.createdAt).toLocaleString('it-IT')}
                  </p>
                </div>
              </div>
              {prenotazione.updatedAt !== prenotazione.createdAt && (
                <div className="flex gap-3">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                  <div>
                    <p className="font-semibold">Ultima modifica</p>
                    <p className="text-sm text-gray-600">
                      {new Date(prenotazione.updatedAt).toLocaleString('it-IT')}
                    </p>
                  </div>
                </div>
              )}
              {prenotazione.pagamento && (
                <div className="flex gap-3">
                  <div className="w-2 h-2 bg-purple-600 rounded-full mt-2"></div>
                  <div>
                    <p className="font-semibold">Pagamento registrato</p>
                    <p className="text-sm text-gray-600">
                      {new Date(prenotazione.pagamento.createdAt).toLocaleString('it-IT')}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrenotazioneDetail;