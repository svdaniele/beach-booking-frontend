import { useState, useEffect } from 'react';
import pagamentiAPI from '../../api/pagamenti';

const Pagamenti = () => {
  const [pagamenti, setPagamenti] = useState([]);
  const [filteredPagamenti, setFilteredPagamenti] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [metodoFilter, setMetodoFilter] = useState('ALL');
  const [stats, setStats] = useState(null);

  useEffect(() => {
    loadPagamenti();
    loadStats();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [searchTerm, statusFilter, metodoFilter, pagamenti]);

  const loadPagamenti = async () => {
    try {
      const data = await pagamentiAPI.getAll();
      setPagamenti(data);
      setFilteredPagamenti(data);
    } catch (error) {
      console.error('Error loading pagamenti:', error);
      alert('Errore nel caricamento dei pagamenti');
    } finally {
      setLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      const data = await pagamentiAPI.getStats();
      setStats(data);
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  const applyFilters = () => {
    let filtered = [...pagamenti];

    if (searchTerm) {
      filtered = filtered.filter(p =>
        p.id?.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.prenotazione?.codice?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.cliente?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'ALL') {
      filtered = filtered.filter(p => p.stato === statusFilter);
    }

    if (metodoFilter !== 'ALL') {
      filtered = filtered.filter(p => p.metodoPagamento === metodoFilter);
    }

    setFilteredPagamenti(filtered);
  };

  const handleConfirm = async (id) => {
    try {
      await pagamentiAPI.confirm(id);
      loadPagamenti();
      loadStats();
    } catch (error) {
      console.error('Error confirming pagamento:', error);
      alert('Errore nella conferma del pagamento');
    }
  };

  const handleRefund = async (id) => {
    const motivo = prompt('Motivo del rimborso:');
    if (!motivo) return;
    
    try {
      await pagamentiAPI.refund(id, motivo);
      loadPagamenti();
      loadStats();
    } catch (error) {
      console.error('Error refunding pagamento:', error);
      alert('Errore nel rimborso');
    }
  };

  const getStatusBadge = (stato) => {
    const config = {
      COMPLETATO: { bg: 'bg-green-100', text: 'text-green-700', label: 'Completato' },
      PENDING: { bg: 'bg-yellow-100', text: 'text-yellow-700', label: 'In Attesa' },
      CONFERMATO: { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Confermato' },
      RIMBORSATO: { bg: 'bg-purple-100', text: 'text-purple-700', label: 'Rimborsato' },
      FALLITO: { bg: 'bg-red-100', text: 'text-red-700', label: 'Fallito' }
    };
    const { bg, text, label } = config[stato] || config.PENDING;
    return <span className={`px-3 py-1 rounded-full text-sm font-semibold ${bg} ${text}`}>{label}</span>;
  };

  const getMetodoIcon = (metodo) => {
    const icons = {
      CARTA: '💳',
      CONTANTI: '💵',
      BONIFICO: '🏦',
      PAYPAL: '🅿️',
      STRIPE: '💳'
    };
    return icons[metodo] || '💳';
  };

  const totaleIncassato = stats?.totaleIncassato || 0;
  const totaleInAttesa = stats?.totaleInAttesa || 0;
  const totaleTransazioni = stats?.totaleTransazioni || filteredPagamenti.length;
  const ticketMedio = totaleTransazioni > 0 ? totaleIncassato / totaleTransazioni : 0;

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Gestione Pagamenti</h1>
        <button className="flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
          📥 Esporta Report
        </button>
      </div>

      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <p className="text-gray-600 text-sm">Totale Incassato</p>
          <p className="text-3xl font-bold text-green-600 mt-2">€{totaleIncassato.toFixed(2)}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <p className="text-gray-600 text-sm">In Attesa</p>
          <p className="text-3xl font-bold text-yellow-600 mt-2">€{totaleInAttesa.toFixed(2)}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <p className="text-gray-600 text-sm">Transazioni</p>
          <p className="text-3xl font-bold text-primary-600 mt-2">{totaleTransazioni}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <p className="text-gray-600 text-sm">Ticket Medio</p>
          <p className="text-3xl font-bold text-blue-600 mt-2">€{ticketMedio.toFixed(2)}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="grid md:grid-cols-4 gap-4">
          <div className="md:col-span-2 relative">
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">🔍</span>
            <input
              type="text"
              placeholder="Cerca transazione o cliente..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border rounded-lg"
            />
          </div>
          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg"
            >
              <option value="ALL">Tutti gli stati</option>
              <option value="COMPLETATO">Completato</option>
              <option value="PENDING">In Attesa</option>
              <option value="CONFERMATO">Confermato</option>
              <option value="RIMBORSATO">Rimborsato</option>
              <option value="FALLITO">Fallito</option>
            </select>
          </div>
          <div>
            <select
              value={metodoFilter}
              onChange={(e) => setMetodoFilter(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg"
            >
              <option value="ALL">Tutti i metodi</option>
              <option value="CARTA">Carta</option>
              <option value="CONTANTI">Contanti</option>
              <option value="BONIFICO">Bonifico</option>
              <option value="PAYPAL">PayPal</option>
              <option value="STRIPE">Stripe</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Prenotazione</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Data</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Metodo</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Importo</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stato</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Azioni</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredPagamenti.map((pag) => (
                <tr key={pag.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <p className="font-mono text-sm font-semibold">#{pag.id}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-primary-600 font-semibold">
                      {pag.prenotazione?.codice || 'N/A'}
                    </p>
                    <p className="text-xs text-gray-500">
                      {pag.prenotazione?.cliente?.nome} {pag.prenotazione?.cliente?.cognome}
                    </p>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    {new Date(pag.createdAt).toLocaleDateString('it-IT')}
                    <p className="text-gray-500 text-xs">
                      {new Date(pag.createdAt).toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span>{getMetodoIcon(pag.metodoPagamento)}</span>
                      <span className="text-sm">{pag.metodoPagamento}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-bold text-lg">€{pag.importo?.toFixed(2) || '0.00'}</p>
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(pag.stato)}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      {pag.stato === 'PENDING' && (
                        <button 
                          onClick={() => handleConfirm(pag.id)}
                          className="p-2 text-green-600 hover:bg-green-50 rounded-lg"
                          title="Conferma"
                        >
                          ✓
                        </button>
                      )}
                      {pag.stato === 'COMPLETATO' && (
                        <button 
                          onClick={() => handleRefund(pag.id)}
                          className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg"
                          title="Rimborso"
                        >
                          ↩️
                        </button>
                      )}
                      <button className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg" title="Dettagli">
                        📄
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredPagamenti.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          Nessun pagamento trovato
        </div>
      )}
    </div>
  );
};

export default Pagamenti;