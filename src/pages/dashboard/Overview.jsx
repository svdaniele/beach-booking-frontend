import { useState, useEffect } from 'react';
import prenotazioniAPI from '../../api/prenotazioni';
import ombrelloniAPI from '../../api/ombrelloni';
import useAuth from '../../hooks/useAuth';

const Overview = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [prenotazioniRecenti, setPrenotazioniRecenti] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [statsData, prenotazioniData] = await Promise.all([
        prenotazioniAPI.getStats(),
        prenotazioniAPI.getAll({ limit: 5 })
      ]);
      
      setStats(statsData);
      setPrenotazioniRecenti(prenotazioniData.slice(0, 5));
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="bg-gradient-to-r from-blue-500 to-cyan-400 rounded-xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Benvenuto, {user?.nome}! 👋</h1>
        <p className="text-lg opacity-90">Ecco un riepilogo della tua attività</p>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-600 text-sm">Prenotazioni Oggi</p>
            <span className="text-2xl">📅</span>
          </div>
          <p className="text-3xl font-bold text-primary-600">{stats?.prenotazioniOggi || 0}</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-600 text-sm">Ombrelloni Occupati</p>
            <span className="text-2xl">🏖️</span>
          </div>
          <p className="text-3xl font-bold text-green-600">{stats?.ombrelloniOccupati || 0}</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-600 text-sm">Incasso Oggi</p>
            <span className="text-2xl">💰</span>
          </div>
          <p className="text-3xl font-bold text-purple-600">
            €{(stats?.incassoOggi || 0).toFixed(2)}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-600 text-sm">Tasso Occupazione</p>
            <span className="text-2xl">📊</span>
          </div>
          <p className="text-3xl font-bold text-blue-600">
            {stats?.tassoOccupazione || 0}%
          </p>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Prenotazioni per Stato */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-xl font-bold mb-4">Prenotazioni per Stato</h3>
          <div className="space-y-3">
            {[
              { label: 'Confermate', count: stats?.statiPrenotazioni?.CONFIRMED || 0, color: 'bg-green-500' },
              { label: 'In Attesa', count: stats?.statiPrenotazioni?.PENDING || 0, color: 'bg-yellow-500' },
              { label: 'Pagate', count: stats?.statiPrenotazioni?.PAID || 0, color: 'bg-blue-500' },
              { label: 'Cancellate', count: stats?.statiPrenotazioni?.CANCELLED || 0, color: 'bg-red-500' },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">{item.label}</span>
                    <span className="text-sm font-bold">{item.count}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${item.color}`}
                      style={{ width: `${(item.count / (stats?.totalePrenotazioni || 1)) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-xl font-bold mb-4">Azioni Rapide</h3>
          <div className="grid grid-cols-2 gap-4">
            <a
              href="/dashboard/prenotazioni"
              className="p-4 border-2 border-primary-600 rounded-lg hover:bg-primary-50 text-center"
            >
              <div className="text-3xl mb-2">📋</div>
              <p className="font-semibold text-primary-600">Nuova Prenotazione</p>
            </a>
            <a
              href="/dashboard/ombrelloni"
              className="p-4 border-2 border-green-600 rounded-lg hover:bg-green-50 text-center"
            >
              <div className="text-3xl mb-2">🏖️</div>
              <p className="font-semibold text-green-600">Gestisci Ombrelloni</p>
            </a>
            <a
              href="/dashboard/clienti"
              className="p-4 border-2 border-blue-600 rounded-lg hover:bg-blue-50 text-center"
            >
              <div className="text-3xl mb-2">👥</div>
              <p className="font-semibold text-blue-600">Clienti</p>
            </a>
            <a
              href="/dashboard/pagamenti"
              className="p-4 border-2 border-purple-600 rounded-lg hover:bg-purple-50 text-center"
            >
              <div className="text-3xl mb-2">💳</div>
              <p className="font-semibold text-purple-600">Pagamenti</p>
            </a>
          </div>
        </div>
      </div>

      {/* Recent Bookings */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold">Prenotazioni Recenti</h3>
          <a href="/dashboard/prenotazioni" className="text-primary-600 hover:text-primary-700 font-medium">
            Vedi tutte →
          </a>
        </div>
        
        {prenotazioniRecenti.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Codice</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cliente</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ombrellone</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stato</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {prenotazioniRecenti.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-mono text-sm">{p.codicePrenotazione}</td>
                    <td className="px-4 py-3">
                      {p.user?.nome} {p.user?.cognome}
                    </td>
                    <td className="px-4 py-3">
                      #{p.ombrellone?.numero} - Fila {p.ombrellone?.fila}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      {new Date(p.dataInizio).toLocaleDateString('it-IT')} - 
                      {new Date(p.dataFine).toLocaleDateString('it-IT')}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        p.stato === 'CONFIRMED' ? 'bg-green-100 text-green-700' :
                        p.stato === 'PENDING' ? 'bg-yellow-100 text-yellow-700' :
                        p.stato === 'PAID' ? 'bg-blue-100 text-blue-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {p.stato}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center text-gray-500 py-8">Nessuna prenotazione recente</p>
        )}
      </div>
    </div>
  );
};

export default Overview;