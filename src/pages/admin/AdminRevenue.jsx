import { useState, useEffect } from 'react';
import adminAPI from '../../api/admin';

const AdminRevenue = () => {
  const [revenue, setRevenue] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRevenue();
  }, []);

  const loadRevenue = async () => {
    try {
      const data = await adminAPI.getRevenueStats();
      setRevenue(data);
    } catch (error) {
      console.error('Error loading revenue:', error);
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
      <h1 className="text-4xl font-bold">Revenue Management</h1>

      {/* Total Revenue */}
      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white border-4 border-black p-6">
          <p className="text-sm font-bold mb-2">REVENUE TOTALE</p>
          <p className="text-5xl font-bold">€{(revenue?.totalRevenue || 0).toFixed(0)}</p>
        </div>

        <div className="bg-white border-4 border-black p-6">
          <p className="text-sm font-bold text-gray-600 mb-2">QUESTO MESE</p>
          <p className="text-4xl font-bold text-green-600">€{(revenue?.thisMonth || 0).toFixed(0)}</p>
        </div>

        <div className="bg-white border-4 border-black p-6">
          <p className="text-sm font-bold text-gray-600 mb-2">MESE SCORSO</p>
          <p className="text-4xl font-bold text-blue-600">€{(revenue?.lastMonth || 0).toFixed(0)}</p>
        </div>

        <div className="bg-white border-4 border-black p-6">
          <p className="text-sm font-bold text-gray-600 mb-2">CRESCITA</p>
          <p className={`text-4xl font-bold ${(revenue?.growth || 0) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {(revenue?.growth || 0) >= 0 ? '+' : ''}{(revenue?.growth || 0).toFixed(1)}%
          </p>
        </div>
      </div>

      {/* Revenue by Tenant */}
      <div className="bg-white border-4 border-black p-6">
        <h2 className="text-2xl font-bold mb-4 border-b-2 border-black pb-2">Revenue per Tenant</h2>
        <div className="space-y-3">
          {revenue?.tenantRevenue?.map((tenant, idx) => (
            <div key={tenant.tenantId} className="flex items-center gap-4">
              <div className="w-8 h-8 bg-black text-white flex items-center justify-center font-bold">
                {idx + 1}
              </div>
              <div className="flex-1">
                <div className="flex justify-between mb-1">
                  <span className="font-bold">{tenant.nomeStabilimento}</span>
                  <span className="font-bold text-green-600">€{tenant.revenue.toFixed(0)}</span>
                </div>
                <div className="bg-gray-200 h-6 border-2 border-black">
                  <div 
                    className="bg-green-500 h-full border-r-2 border-black"
                    style={{ width: `${(tenant.revenue / (revenue?.maxRevenue || 1)) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          )) || (
            <p className="text-gray-500 text-center py-8 font-semibold">Nessun dato disponibile</p>
          )}
        </div>
      </div>

      {/* Monthly Trend */}
      <div className="bg-white border-4 border-black p-6">
        <h2 className="text-2xl font-bold mb-4 border-b-2 border-black pb-2">Trend Mensile</h2>
        <div className="grid md:grid-cols-6 gap-4">
          {revenue?.monthlyTrend?.map(month => (
            <div key={month.month} className="text-center">
              <div className="bg-gray-100 border-2 border-black p-4 mb-2">
                <p className="text-2xl font-bold text-green-600">€{(month.revenue / 1000).toFixed(1)}K</p>
              </div>
              <p className="text-xs font-bold">{month.month}</p>
            </div>
          )) || (
            <p className="text-gray-500 text-center py-8 font-semibold col-span-6">Nessun dato</p>
          )}
        </div>
      </div>

      {/* Revenue Sources */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white border-4 border-black p-6">
          <h3 className="text-xl font-bold mb-4 border-b-2 border-black pb-2">Per Tipo Prenotazione</h3>
          <div className="space-y-3">
            {revenue?.byBookingType?.map(type => (
              <div key={type.tipo} className="flex justify-between items-center">
                <span className="font-bold text-sm">{type.tipo}</span>
                <span className="font-bold text-green-600">€{type.revenue.toFixed(0)}</span>
              </div>
            )) || <p className="text-gray-500 text-sm">Nessun dato</p>}
          </div>
        </div>

        <div className="bg-white border-4 border-black p-6">
          <h3 className="text-xl font-bold mb-4 border-b-2 border-black pb-2">Per Metodo Pagamento</h3>
          <div className="space-y-3">
            {revenue?.byPaymentMethod?.map(method => (
              <div key={method.metodo} className="flex justify-between items-center">
                <span className="font-bold text-sm">{method.metodo}</span>
                <span className="font-bold text-green-600">€{method.revenue.toFixed(0)}</span>
              </div>
            )) || <p className="text-gray-500 text-sm">Nessun dato</p>}
          </div>
        </div>

        <div className="bg-white border-4 border-black p-6">
          <h3 className="text-xl font-bold mb-4 border-b-2 border-black pb-2">Statistiche</h3>
          <div className="space-y-3">
            <div>
              <p className="text-sm font-bold text-gray-600">Ticket Medio</p>
              <p className="text-2xl font-bold text-blue-600">€{(revenue?.avgTicket || 0).toFixed(2)}</p>
            </div>
            <div>
              <p className="text-sm font-bold text-gray-600">Transazioni</p>
              <p className="text-2xl font-bold text-purple-600">{revenue?.totalTransactions || 0}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminRevenue;