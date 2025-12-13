import { useState, useEffect } from 'react';
import adminAPI from '../../api/admin';

const AdminTenants = () => {
  const [tenants, setTenants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('ALL');

  useEffect(() => {
    loadTenants();
  }, []);

  const loadTenants = async () => {
    try {
      const data = await adminAPI.getAllTenants();
      setTenants(data);
    } catch (error) {
      console.error('Error loading tenants:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSuspend = async (tenantId) => {
    const motivo = prompt('Motivo sospensione:');
    if (!motivo) return;
    
    try {
      await adminAPI.suspendTenant(tenantId, motivo);
      loadTenants();
    } catch (error) {
      alert('Errore nella sospensione');
    }
  };

  const handleActivate = async (tenantId) => {
    try {
      await adminAPI.activateTenant(tenantId);
      loadTenants();
    } catch (error) {
      alert('Errore nell\'attivazione');
    }
  };

  const handleDelete = async (tenantId) => {
    if (!confirm('ATTENZIONE: Eliminare definitivamente questo tenant e tutti i suoi dati?')) return;
    
    try {
      await adminAPI.deleteTenant(tenantId);
      loadTenants();
    } catch (error) {
      alert('Errore nell\'eliminazione');
    }
  };

  const filteredTenants = tenants.filter(t => {
    if (filter === 'ALL') return true;
    return t.stato === filter;
  });

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
        <h1 className="text-4xl font-bold">Gestione Tenant</h1>
        <div className="flex gap-2">
          {['ALL', 'ATTIVO', 'SOSPESO', 'TRIAL'].map(stato => (
            <button
              key={stato}
              onClick={() => setFilter(stato)}
              className={`px-4 py-2 font-bold border-2 border-black ${
                filter === stato ? 'bg-red-600 text-white' : 'bg-white hover:bg-gray-100'
              }`}
            >
              {stato}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white border-4 border-black p-4">
        <p className="text-sm font-bold">
          Totale: {filteredTenants.length} tenant
        </p>
      </div>

      <div className="space-y-4">
        {filteredTenants.map(tenant => (
          <div key={tenant.id} className="bg-white border-4 border-black p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-2xl font-bold">{tenant.nomeStabilimento}</h3>
                  <span className={`px-3 py-1 text-xs font-bold border-2 border-black ${
                    tenant.stato === 'ATTIVO' ? 'bg-green-500 text-white' :
                    tenant.stato === 'SOSPESO' ? 'bg-red-500 text-white' :
                    'bg-yellow-500 text-white'
                  }`}>
                    {tenant.stato}
                  </span>
                </div>
                
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600 font-bold">Slug</p>
                    <p className="font-semibold">{tenant.slug}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 font-bold">Email</p>
                    <p className="font-semibold">{tenant.email}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 font-bold">Creato</p>
                    <p className="font-semibold">{new Date(tenant.createdAt).toLocaleDateString('it-IT')}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 font-bold">Città</p>
                    <p className="font-semibold">{tenant.citta}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 font-bold">Telefono</p>
                    <p className="font-semibold">{tenant.telefono}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 font-bold">Piano</p>
                    <p className="font-semibold">{tenant.pianoAbbonamento}</p>
                  </div>
                </div>

                <div className="mt-4 grid md:grid-cols-3 gap-4 pt-4 border-t-2 border-black">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-blue-600">{tenant.totalOmbrelloni || 0}</p>
                    <p className="text-xs font-bold text-gray-600">Ombrelloni</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-green-600">{tenant.totalPrenotazioni || 0}</p>
                    <p className="text-xs font-bold text-gray-600">Prenotazioni</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-purple-600">€{(tenant.totalRevenue || 0).toFixed(0)}</p>
                    <p className="text-xs font-bold text-gray-600">Revenue</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2 ml-4">
                <a
                  href={`/admin/tenants/${tenant.id}`}
                  className="px-4 py-2 bg-blue-600 text-white font-bold hover:bg-blue-700 text-center"
                >
                  DETTAGLI
                </a>
                {tenant.stato === 'ATTIVO' ? (
                  <button
                    onClick={() => handleSuspend(tenant.id)}
                    className="px-4 py-2 bg-red-600 text-white font-bold hover:bg-red-700"
                  >
                    SOSPENDI
                  </button>
                ) : (
                  <button
                    onClick={() => handleActivate(tenant.id)}
                    className="px-4 py-2 bg-green-600 text-white font-bold hover:bg-green-700"
                  >
                    ATTIVA
                  </button>
                )}
                <button
                  onClick={() => handleDelete(tenant.id)}
                  className="px-4 py-2 bg-black text-white font-bold hover:bg-gray-800"
                >
                  ELIMINA
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredTenants.length === 0 && (
        <div className="text-center py-12 bg-white border-4 border-black">
          <p className="text-gray-500 text-lg font-bold">Nessun tenant trovato</p>
        </div>
      )}
    </div>
  );
};

export default AdminTenants;