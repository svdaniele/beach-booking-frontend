import { useState, useEffect } from 'react';
import adminAPI from '../../api/admin';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const data = await adminAPI.getDashboardStats();
      setStats(data);
    } catch (error) {
      console.error('Error loading stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-8 border-4 border-black">
        <h1 className="text-4xl font-bold mb-2">Dashboard Globale</h1>
        <p className="text-lg font-semibold">Panoramica piattaforma Beach Booking</p>
      </div>

      {/* Main Stats */}
      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-white border-4 border-black p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-bold text-gray-600">TENANT TOTALI</p>
            <span className="text-3xl">🏢</span>
          </div>
          <p className="text-5xl font-bold text-primary-600">{stats?.totalTenants || 0}</p>
        </div>

        <div className="bg-white border-4 border-black p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-bold text-gray-600">UTENTI TOTALI</p>
            <span className="text-3xl">👥</span>
          </div>
          <p className="text-5xl font-bold text-green-600">{stats?.totalUsers || 0}</p>
        </div>

        <div className="bg-white border-4 border-black p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-bold text-gray-600">PRENOTAZIONI</p>
            <span className="text-3xl">📅</span>
          </div>
          <p className="text-5xl font-bold text-blue-600">{stats?.totalPrenotazioni || 0}</p>
        </div>

        <div className="bg-white border-4 border-black p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-bold text-gray-600">REVENUE TOTALE</p>
            <span className="text-3xl">💰</span>
          </div>
          <p className="text-5xl font-bold text-purple-600">€{(stats?.totalRevenue || 0).toFixed(0)}</p>
        </div>
      </div>

      {/* Tenant Stats */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white border-4 border-black p-6">
          <h3 className="text-xl font-bold mb-4 border-b-2 border-black pb-2">Tenant Attivi</h3>
          <p className="text-6xl font-bold text-green-600">{stats?.tenantsAttivi || 0}</p>
        </div>

        <div className="bg-white border-4 border-black p-6">
          <h3 className="text-xl font-bold mb-4 border-b-2 border-black pb-2">Tenant Sospesi</h3>
          <p className="text-6xl font-bold text-red-600">{stats?.tenantsSospesi || 0}</p>
        </div>

        <div className="bg-white border-4 border-black p-6">
          <h3 className="text-xl font-bold mb-4 border-b-2 border-black pb-2">Nuovi (30gg)</h3>
          <p className="text-6xl font-bold text-blue-600">{stats?.tenantsNuovi || 0}</p>
        </div>
      </div>

      {/* Revenue Chart */}
      <div className="bg-white border-4 border-black p-6">
        <h3 className="text-2xl font-bold mb-4 border-b-2 border-black pb-2">Revenue per Mese</h3>
        <div className="space-y-3">
          {stats?.monthlyRevenue?.map((month, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <div className="w-24 font-bold text-sm">{month.month}</div>
              <div className="flex-1">
                <div className="bg-gray-200 h-8 border-2 border-black relative">
                  <div 
                    className="bg-green-500 h-full border-r-2 border-black flex items-center justify-end pr-2"
                    style={{ width: `${(month.revenue / (stats?.maxRevenue || 1)) * 100}%` }}
                  >
                    <span className="font-bold text-white text-sm">€{month.revenue.toFixed(0)}</span>
                  </div>
                </div>
              </div>
            </div>
          )) || (
            <p className="text-gray-500 text-center py-8 font-semibold">Nessun dato disponibile</p>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white border-4 border-black p-6">
        <h3 className="text-2xl font-bold mb-4 border-b-2 border-black pb-2">Azioni Rapide</h3>
        <div className="grid md:grid-cols-4 gap-4">
          <a
            href="/admin/tenants"
            className="p-6 border-4 border-black hover:bg-red-600 hover:text-white transition-colors text-center"
          >
            <div className="text-4xl mb-2">🏢</div>
            <p className="font-bold">Gestisci Tenant</p>
          </a>
          <a
            href="/admin/users"
            className="p-6 border-4 border-black hover:bg-blue-600 hover:text-white transition-colors text-center"
          >
            <div className="text-4xl mb-2">👥</div>
            <p className="font-bold">Gestisci Utenti</p>
          </a>
          <a
            href="/admin/revenue"
            className="p-6 border-4 border-black hover:bg-green-600 hover:text-white transition-colors text-center"
          >
            <div className="text-4xl mb-2">💰</div>
            <p className="font-bold">Revenue</p>
          </a>
          <a
            href="/admin/analytics"
            className="p-6 border-4 border-black hover:bg-purple-600 hover:text-white transition-colors text-center"
          >
            <div className="text-4xl mb-2">📈</div>
            <p className="font-bold">Analytics</p>
          </a>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;