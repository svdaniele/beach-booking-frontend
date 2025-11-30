import { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import ombrelloniAPI from '../../api/ombrelloni';
import MappaOmbrelloni from '../../components/booking/MappaOmbrelloni';

const Ombrelloni = () => {
  const [ombrelloni, setOmbrelloni] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    numero: '',
    fila: 'A',
    tipo: 'STANDARD',
    descrizione: '',
    posizioneX: 0,
    posizioneY: 0,
  });

  useEffect(() => {
    loadOmbrelloni();
  }, []);

  const loadOmbrelloni = async () => {
    try {
      const data = await ombrelloniAPI.getAll();
      setOmbrelloni(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await ombrelloniAPI.create(formData);
      loadOmbrelloni();
      setShowForm(false);
      setFormData({ numero: '', fila: 'A', tipo: 'STANDARD', descrizione: '', posizioneX: 0, posizioneY: 0 });
    } catch (error) {
      alert('Errore: ' + (error.response?.data?.message || 'Errore sconosciuto'));
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Eliminare?')) return;
    try {
      await ombrelloniAPI.delete(id);
      loadOmbrelloni();
    } catch (error) {
      alert('Errore');
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-96"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div></div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Gestione Ombrelloni</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
        >
          <FaPlus /> Aggiungi Ombrellone
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white rounded-xl shadow-sm p-6">
          <form onSubmit={handleSubmit} className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Numero</label>
              <input
                type="number"
                value={formData.numero}
                onChange={(e) => setFormData({ ...formData, numero: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Fila</label>
              <input
                type="text"
                value={formData.fila}
                onChange={(e) => setFormData({ ...formData, fila: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Tipo</label>
              <select
                value={formData.tipo}
                onChange={(e) => setFormData({ ...formData, tipo: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg"
              >
                <option value="STANDARD">Standard</option>
                <option value="PREMIUM">Premium</option>
                <option value="VIP">VIP</option>
                <option value="FAMILY">Family</option>
              </select>
            </div>
            <div className="md:col-span-3 flex gap-4">
              <button type="submit" className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
                Salva
              </button>
              <button type="button" onClick={() => setShowForm(false)} className="px-6 py-2 border rounded-lg">
                Annulla
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Mappa */}
      <MappaOmbrelloni readOnly />

      {/* Lista */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-xl font-bold mb-4">Lista Ombrelloni ({ombrelloni.length})</h3>
        <div className="grid md:grid-cols-4 gap-4">
          {ombrelloni.map(o => (
            <div key={o.id} className="border rounded-lg p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="font-bold text-lg">#{o.numero}</p>
                  <p className="text-sm text-gray-600">Fila {o.fila}</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded ${
                  o.tipo === 'VIP' ? 'bg-purple-100 text-purple-700' :
                  o.tipo === 'PREMIUM' ? 'bg-blue-100 text-blue-700' :
                  'bg-gray-100 text-gray-700'
                }`}>
                  {o.tipo}
                </span>
              </div>
              <div className="flex gap-2 mt-3">
                <button className="text-primary-600 hover:text-primary-700"><FaEdit /></button>
                <button onClick={() => handleDelete(o.id)} className="text-red-600 hover:text-red-700"><FaTrash /></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Ombrelloni;