import { useState, useEffect } from 'react';
import adminAPI from '../../api/admin';

const AdminAnalytics = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState({
    startDate: new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    loadAnalytics();
  }, [dateRange]);

  const loadAnalytics = async () => {
    setLoading(true);
    try {
      const data = await adminAPI.getAnalytics(dateRange.startDate, dateRange.endDate);
      setAnalytics(data);
    } catch (error) {
      console.error('Error loading analytics:', error);
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
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold">Analytics Platform</h1>
        <div className="flex gap-4">
          <input
            type="date"
            value={dateRange.startDate}
            onChange={(e) => setDateRange({ ...dateRange, startDate: e.target.value })}
            className="px-4 py-2 border-2 border-black font-semibold"
          />
          <input
            type="date"
            value={dateRange.endDate}
            onChange={(e) => setDateRange({ ...dateRange, endDate: e.target.value })}
            className="px-4 py-2 border-2 border-black font-semibold"
          />
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid md:grid-cols-5 gap-4">
        <div className="bg-white border-4 border-black p-4">
          <p className="text-xs font-bold text-gray-600 mb-1">NUOVI TENANT</p>
          <p className="text-3xl font-bold text-blue-600">{analytics?.newTenants || 0}</p>
        </div>
        <div className="bg-white border-4 border-black p-4">
          <p className="text-xs font-bold text-gray-600 mb-1">NUOVI UTENTI</p>
          <p className="text-3xl font-bold text-green-600">{analytics?.newUsers || 0}</p>
        </div>
        <div className="bg-white border-4 border-black p-4">
          <p className="text-xs font-bold text-gray-600 mb-1">PRENOTAZIONI</p>
          <p className="text-3xl font-bold text-purple-600">{analytics?.totalBookings || 0}</p>
        </div>
        <div className="bg-white border-4 border-black p-4">
          <p className="text-xs font-bold text-gray-600 mb-1">TASSO CONV.</p>
          <p className="text-3xl font-bold text-orange-600">{(analytics?.conversionRate || 0).toFixed(1)}%</p>
        </div>
        <div className="bg-white border-4 border-black p-4">
          <p className="text-xs font-bold text-gray-600 mb-1">REVENUE</p>
          <p className="text-3xl font-bold text-green-600">€{(analytics?.revenue || 0).toFixed(0)}</p>
        </div>
      </div>

      {/* User Activity */}
      <div className="bg-white border-4 border-black p-6">
        <h2 className="text-2xl font-bold mb-4 border-b-2 border-black pb-2">Attività Utenti</h2>
        <div className="grid md:grid-cols-4 gap-6">
          <div className="text-center">
            <p className="text-4xl font-bold text-blue-600">{analytics?.activeUsers || 0}</p>
            <p className="text-sm font-bold text-gray-600 mt-1">Utenti Attivi</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-green-600">{analytics?.avgSessionDuration || 0}m</p>
            <p className="text-sm font-bold text-gray-600 mt-1">Durata Media Sessione</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-purple-600">{(analytics?.bounceRate || 0).toFixed(1)}%</p>
            <p className="text-sm font-bold text-gray-600 mt-1">Bounce Rate</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-orange-600">{analytics?.pageViews || 0}</p>
            <p className="text-sm font-bold text-gray-600 mt-1">Page Views</p>
          </div>
        </div>
      </div>

      {/* Booking Analytics */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white border-4 border-black p-6">
          <h2 className="text-2xl font-bold mb-4 border-b-2 border-black pb-2">Status Prenotazioni</h2>
          <div className="space-y-3">
            {[
              { label: 'CONFERMATO', count: analytics?.bookingsByStatus?.CONFIRMED || 0, color: 'bg-green-500' },
              { label: 'PENDING', count: analytics?.bookingsByStatus?.PENDING || 0, color: 'bg-yellow-500' },
              { label: 'PAGATO', count: analytics?.bookingsByStatus?.PAID || 0, color: 'bg-blue-500' },
              { label: 'CANCELLATO', count: analytics?.bookingsByStatus?.CANCELLED || 0, color: 'bg-red-500' },
            ].map(status => (
              <div key={status.label} className="flex items-center gap-3">
                <div className={`w-4 h-4 ${status.color} border-2 border-black`} />
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <span className="font-bold text-sm">{status.label}</span>
                    <span className="font-bold">{status.count}</span>
                  </div>
                  <div className="bg-gray-200 h-4 border-2 border-black">
                    <div 
                      className={`${status.color} h-full`}
                      style={{ width: `${(status.count / (analytics?.totalBookings || 1)) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border-4 border-black p-6">
          <h2 className="text-2xl font-bold mb-4 border-b-2 border-black pb-2">Top Performing Tenants</h2>
          <div className="space-y-3">
            {analytics?.topTenants?.slice(0, 5).map((tenant, idx) => (
              <div key={tenant.id} className="flex items-center gap-3 border-2 border-black p-3">
                <div className="w-8 h-8 bg-black text-white flex items-center justify-center font-bold">
                  {idx + 1}
                </div>
                <div className="flex-1">
                  <p className="font-bold">{tenant.nome}</p>
                  <div className="flex gap-4 text-sm">
                    <span className="font-semibold text-blue-600">{tenant.bookings} prenotazioni</span>
                    <span className="font-semibold text-green-600">€{tenant.revenue.toFixed(0)}</span>
                  </div>
                </div>
              </div>
            )) || <p className="text-gray-500 text-center py-4 font-semibold">Nessun dato</p>}
          </div>
        </div>
      </div>

      {/* Daily Activity */}
      <div className="bg-white border-4 border-black p-6">
        <h2 className="text-2xl font-bold mb-4 border-b-2 border-black pb-2">Attività Giornaliera</h2>
        <div className="flex gap-2 h-48 items-end">
          {analytics?.dailyActivity?.map(day => (
            <div key={day.date} className="flex-1 flex flex-col items-center gap-2">
              <div 
                className="w-full bg-blue-500 border-2 border-black hover:bg-blue-600 cursor-pointer transition-colors"
                style={{ height: `${(day.value / (analytics?.maxDailyActivity || 1)) * 100}%` }}
                title={`${day.date}: ${day.value}`}
              />
              <span className="text-xs font-bold transform -rotate-45 origin-top-left">
                {new Date(day.date).toLocaleDateString('it-IT', { day: '2-digit', month: '2-digit' })}
              </span>
            </div>
          )) || <p className="text-gray-500 text-center w-full font-semibold">Nessun dato</p>}
        </div>
      </div>

      {/* Platform Health */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white border-4 border-black p-6">
          <h3 className="text-xl font-bold mb-4 border-b-2 border-black pb-2">System Health</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="font-bold text-sm">Uptime</span>
              <span className="font-bold text-green-600">{(analytics?.uptime || 99.9).toFixed(2)}%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-bold text-sm">Avg Response</span>
              <span className="font-bold text-blue-600">{analytics?.avgResponseTime || 0}ms</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-bold text-sm">Error Rate</span>
              <span className="font-bold text-red-600">{(analytics?.errorRate || 0).toFixed(2)}%</span>
            </div>
          </div>
        </div>

        <div className="bg-white border-4 border-black p-6">
          <h3 className="text-xl font-bold mb-4 border-b-2 border-black pb-2">Dispositivi</h3>
          <div className="space-y-3">
            {analytics?.deviceStats?.map(device => (
              <div key={device.type} className="flex justify-between items-center">
                <span className="font-bold text-sm">{device.type}</span>
                <span className="font-bold text-purple-600">{device.percentage}%</span>
              </div>
            )) || <p className="text-gray-500 text-sm">Nessun dato</p>}
          </div>
        </div>

        <div className="bg-white border-4 border-black p-6">
          <h3 className="text-xl font-bold mb-4 border-b-2 border-black pb-2">Top Locations</h3>
          <div className="space-y-3">
            {analytics?.topLocations?.map(loc => (
              <div key={loc.city} className="flex justify-between items-center">
                <span className="font-bold text-sm">{loc.city}</span>
                <span className="font-bold text-orange-600">{loc.users}</span>
              </div>
            )) || <p className="text-gray-500 text-sm">Nessun dato</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;