import { useState, useEffect } from 'react';
import clientiAPI from '../../api/clienti';

const Clienti = () => {
  const [clienti, setClienti] = useState([]);
  const [filteredClienti, setFilteredClienti] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    nome: '',
    cognome: '',
    email: '',
    password: '',
    telefono: '',
    codiceFiscale: '',
    indirizzo: '',
    citta: '',
    provincia: '',
    cap: '',
  });

  useEffect(() => {
    loadClienti();
  }, []);

  useEffect(() => {
    const filtered = clienti.filter(c =>
      c.nome?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.cognome?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.telefono?.includes(searchTerm)
    );
    setFilteredClienti(filtered);
  }, [searchTerm, clienti]);

  const loadClienti = async () => {
    try {
      const data = await clientiAPI.getAll();
      setClienti(data);
      setFilteredClienti(data);
    } catch (error) {
      console.error('Error loading clienti:', error);
      alert('Errore nel caricamento dei clienti');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      if (editingId) {
        await clientiAPI.update(editingId, formData);
      } else {
        await clientiAPI.create(formData);
      }
      loadClienti();
      resetForm();
    } catch (error) {
      console.error('Error saving cliente:', error);
      alert('Errore: ' + (error.response?.data?.message || 'Errore sconosciuto'));
    }
  };

  const handleEdit = (cliente) => {
    setFormData({
      nome: cliente.nome || '',
      cognome: cliente.cognome || '',
      email: cliente.email || '',
      password: '',
      telefono: cliente.telefono || '',
      codiceFiscale: cliente.codiceFiscale || '',
      indirizzo: cliente.indirizzo || '',
      citta: cliente.citta || '',
      provincia: cliente.provincia || '',
      cap: cliente.cap || '',
    });
    setEditingId(cliente.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Eliminare questo cliente? Le prenotazioni associate non verranno eliminate.')) return;
    try {
      await clientiAPI.delete(id);
      loadClienti();
    } catch (error) {
      console.error('Error deleting cliente:', error);
      alert('Errore eliminazione');
    }
  };

  const resetForm = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({
      nome: '',
      cognome: '',
      email: '',
      password: '',
      telefono: '',
      codiceFiscale: '',
      indirizzo: '',
      citta: '',
      provincia: '',
      cap: '',
    });
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
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Gestione Clienti</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
        >
          ➕ Aggiungi Cliente
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold mb-4">{editingId ? 'Modifica' : 'Nuovo'} Cliente</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Nome *</label>
              <input
                type="text"
                value={formData.nome}
                onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Cognome *</label>
              <input
                type="text"
                value={formData.cognome}
                onChange={(e) => setFormData({ ...formData, cognome: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email *</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Password {!editingId && '*'}</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg"
                placeholder={editingId ? 'Lascia vuoto per non modificare' : ''}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Telefono *</label>
              <input
                type="tel"
                value={formData.telefono}
                onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Codice Fiscale</label>
              <input
                type="text"
                value={formData.codiceFiscale}
                onChange={(e) => setFormData({ ...formData, codiceFiscale: e.target.value.toUpperCase() })}
                className="w-full px-4 py-2 border rounded-lg"
                maxLength={16}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Indirizzo</label>
              <input
                type="text"
                value={formData.indirizzo}
                onChange={(e) => setFormData({ ...formData, indirizzo: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Città</label>
              <input
                type="text"
                value={formData.citta}
                onChange={(e) => setFormData({ ...formData, citta: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Provincia</label>
              <input
                type="text"
                value={formData.provincia}
                onChange={(e) => setFormData({ ...formData, provincia: e.target.value.toUpperCase() })}
                className="w-full px-4 py-2 border rounded-lg"
                maxLength={2}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">CAP</label>
              <input
                type="text"
                value={formData.cap}
                onChange={(e) => setFormData({ ...formData, cap: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg"
                maxLength={5}
              />
            </div>
            <div className="md:col-span-2 flex gap-4">
              <button
                onClick={handleSubmit}
                className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
              >
                Salva Cliente
              </button>
              <button
                onClick={resetForm}
                className="px-6 py-2 border rounded-lg hover:bg-gray-50"
              >
                Annulla
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="relative">
          <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">🔍</span>
          <input
            type="text"
            placeholder="Cerca per nome, cognome, email o telefono..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border rounded-lg"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <p className="text-gray-600 text-sm">Totale Clienti</p>
          <p className="text-3xl font-bold text-primary-600 mt-2">{clienti.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <p className="text-gray-600 text-sm">Clienti Attivi</p>
          <p className="text-3xl font-bold text-green-600 mt-2">{clienti.filter(c => c.attivo).length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <p className="text-gray-600 text-sm">Questo Mese</p>
          <p className="text-3xl font-bold text-blue-600 mt-2">
            {clienti.filter(c => {
              const created = new Date(c.createdAt);
              const now = new Date();
              return created.getMonth() === now.getMonth() && created.getFullYear() === now.getFullYear();
            }).length}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <p className="text-gray-600 text-sm">Con Prenotazioni</p>
          <p className="text-3xl font-bold text-purple-600 mt-2">
            {clienti.filter(c => c.numeroPrenotazioni > 0).length}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cliente</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contatti</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Località</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Registrato</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Azioni</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredClienti.map((cliente) => (
                <tr key={cliente.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-semibold">{cliente.nome} {cliente.cognome}</p>
                      <p className="text-sm text-gray-500">{cliente.codiceFiscale || 'N/A'}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm">
                        <span>✉️</span>
                        <span>{cliente.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <span>📞</span>
                        <span>{cliente.telefono}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm">
                      <p>{cliente.citta || 'N/A'}</p>
                      <p className="text-gray-500">{cliente.provincia || ''} {cliente.cap || ''}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    {new Date(cliente.createdAt).toLocaleDateString('it-IT')}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={() => handleEdit(cliente)}
                        className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => handleDelete(cliente.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredClienti.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          Nessun cliente trovato
        </div>
      )}
    </div>
  );
};

export default Clienti;