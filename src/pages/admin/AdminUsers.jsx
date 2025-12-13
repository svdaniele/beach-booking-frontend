import { useState, useEffect } from 'react';
import adminAPI from '../../api/admin';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('ALL');
  const [search, setSearch] = useState('');

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const data = await adminAPI.getAllUsers();
      setUsers(data);
    } catch (error) {
      console.error('Error loading users:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = users.filter(u => {
    const matchFilter = filter === 'ALL' || u.ruolo === filter;
    const matchSearch = !search || 
      u.nome?.toLowerCase().includes(search.toLowerCase()) ||
      u.cognome?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  const getRuoloColor = (ruolo) => {
    const colors = {
      SUPER_ADMIN: 'bg-red-600 text-white',
      TENANT_ADMIN: 'bg-purple-600 text-white',
      STAFF: 'bg-blue-600 text-white',
      CUSTOMER: 'bg-green-600 text-white',
    };
    return colors[ruolo] || 'bg-gray-600 text-white';
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
        <h1 className="text-4xl font-bold">Gestione Utenti</h1>
      </div>

      <div className="bg-white border-4 border-black p-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <input
              type="text"
              placeholder="Cerca per nome, cognome o email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-3 border-2 border-black font-semibold"
            />
          </div>
          <div className="flex gap-2">
            {['ALL', 'SUPER_ADMIN', 'TENANT_ADMIN', 'STAFF', 'CUSTOMER'].map(role => (
              <button
                key={role}
                onClick={() => setFilter(role)}
                className={`px-3 py-2 text-xs font-bold border-2 border-black ${
                  filter === role ? 'bg-red-600 text-white' : 'bg-white hover:bg-gray-100'
                }`}
              >
                {role.replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white border-4 border-black p-4">
        <div className="flex gap-8">
          <div>
            <p className="text-sm font-bold text-gray-600">TOTALE UTENTI</p>
            <p className="text-3xl font-bold">{filteredUsers.length}</p>
          </div>
          <div>
            <p className="text-sm font-bold text-gray-600">SUPER ADMIN</p>
            <p className="text-3xl font-bold text-red-600">
              {users.filter(u => u.ruolo === 'SUPER_ADMIN').length}
            </p>
          </div>
          <div>
            <p className="text-sm font-bold text-gray-600">TENANT ADMIN</p>
            <p className="text-3xl font-bold text-purple-600">
              {users.filter(u => u.ruolo === 'TENANT_ADMIN').length}
            </p>
          </div>
          <div>
            <p className="text-sm font-bold text-gray-600">STAFF</p>
            <p className="text-3xl font-bold text-blue-600">
              {users.filter(u => u.ruolo === 'STAFF').length}
            </p>
          </div>
          <div>
            <p className="text-sm font-bold text-gray-600">CUSTOMERS</p>
            <p className="text-3xl font-bold text-green-600">
              {users.filter(u => u.ruolo === 'CUSTOMER').length}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white border-4 border-black overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100 border-b-2 border-black">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-bold">UTENTE</th>
              <th className="px-4 py-3 text-left text-xs font-bold">RUOLO</th>
              <th className="px-4 py-3 text-left text-xs font-bold">TENANT</th>
              <th className="px-4 py-3 text-left text-xs font-bold">REGISTRATO</th>
              <th className="px-4 py-3 text-left text-xs font-bold">ULTIMO ACCESSO</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => (
              <tr key={user.id} className="border-b-2 border-gray-200 hover:bg-gray-50">
                <td className="px-4 py-4">
                  <div>
                    <p className="font-bold">{user.nome} {user.cognome}</p>
                    <p className="text-sm text-gray-600 font-medium">{user.email}</p>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <span className={`px-3 py-1 text-xs font-bold border-2 border-black ${getRuoloColor(user.ruolo)}`}>
                    {user.ruolo}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <p className="font-semibold">{user.tenant?.nomeStabilimento || '-'}</p>
                  <p className="text-sm text-gray-600 font-medium">{user.tenant?.slug || ''}</p>
                </td>
                <td className="px-4 py-4 text-sm font-semibold">
                  {new Date(user.createdAt).toLocaleDateString('it-IT')}
                </td>
                <td className="px-4 py-4 text-sm font-semibold">
                  {user.lastLogin ? new Date(user.lastLogin).toLocaleDateString('it-IT') : '-'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredUsers.length === 0 && (
        <div className="text-center py-12 bg-white border-4 border-black">
          <p className="text-gray-500 text-lg font-bold">Nessun utente trovato</p>
        </div>
      )}
    </div>
  );
};

export default AdminUsers;