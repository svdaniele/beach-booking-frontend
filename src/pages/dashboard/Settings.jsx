import { useState, useEffect } from 'react';
import settingsAPI from '../../api/settings';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [tenant, setTenant] = useState(null);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const data = await settingsAPI.getTenantSettings();
      setTenant(data);
    } catch (error) {
      console.error('Error loading settings:', error);
      alert('Errore nel caricamento delle impostazioni');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await settingsAPI.updateTenantSettings(tenant);
      alert('Impostazioni salvate con successo!');
    } catch (error) {
      console.error('Error saving settings:', error);
      alert('Errore nel salvataggio delle impostazioni');
    } finally {
      setSaving(false);
    }
  };

  const updateTenant = (field, value) => {
    setTenant(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleLogoUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    try {
      const data = await settingsAPI.uploadLogo(file);
      setTenant(prev => ({ ...prev, logoUrl: data.logoUrl }));
      alert('Logo caricato con successo!');
    } catch (error) {
      console.error('Error uploading logo:', error);
      alert('Errore nel caricamento del logo');
    }
  };

  const tabs = [
    { id: 'general', label: 'Generale', icon: '📍' },
    { id: 'orari', label: 'Orari', icon: '🕐' },
    { id: 'contatti', label: 'Contatti', icon: '📞' },
    { id: 'tema', label: 'Tema', icon: '🎨' }
  ];

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
        <h1 className="text-3xl font-bold">Impostazioni Stabilimento</h1>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50"
        >
          {saving ? '⏳ Salvataggio...' : '💾 Salva Modifiche'}
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="border-b">
          <div className="flex overflow-x-auto">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 font-medium whitespace-nowrap border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-primary-600 text-primary-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                <span>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6">
          {activeTab === 'general' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold">Informazioni Generali</h2>
              
              {/* Logo */}
              <div>
                <label className="block text-sm font-medium mb-2">Logo Stabilimento</label>
                <div className="flex items-center gap-4">
                  {tenant?.logoUrl && (
                    <img 
                      src={tenant.logoUrl} 
                      alt="Logo" 
                      className="w-24 h-24 object-cover rounded-lg border"
                    />
                  )}
                  <label className="px-4 py-2 border rounded-lg hover:bg-gray-50 cursor-pointer">
                    📷 Carica Logo
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Nome Stabilimento *</label>
                  <input
                    type="text"
                    value={tenant?.nomeStabilimento || ''}
                    onChange={(e) => updateTenant('nomeStabilimento', e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Slug URL</label>
                  <input
                    type="text"
                    value={tenant?.slug || ''}
                    disabled
                    className="w-full px-4 py-2 border rounded-lg bg-gray-50 text-gray-600"
                  />
                  <p className="text-xs text-gray-500 mt-1">URL: {tenant?.slug}.beachbooking.com</p>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">Indirizzo</label>
                  <input
                    type="text"
                    value={tenant?.indirizzo || ''}
                    onChange={(e) => updateTenant('indirizzo', e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Città</label>
                  <input
                    type="text"
                    value={tenant?.citta || ''}
                    onChange={(e) => updateTenant('citta', e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Provincia</label>
                  <input
                    type="text"
                    value={tenant?.provincia || ''}
                    onChange={(e) => updateTenant('provincia', e.target.value.toUpperCase())}
                    className="w-full px-4 py-2 border rounded-lg"
                    maxLength={2}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">CAP</label>
                  <input
                    type="text"
                    value={tenant?.cap || ''}
                    onChange={(e) => updateTenant('cap', e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg"
                    maxLength={5}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Partita IVA</label>
                  <input
                    type="text"
                    value={tenant?.partitaIva || ''}
                    onChange={(e) => updateTenant('partitaIva', e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">Descrizione</label>
                  <textarea
                    value={tenant?.descrizione || ''}
                    onChange={(e) => updateTenant('descrizione', e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg"
                    rows={3}
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'orari' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold">Orari di Apertura</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Orario Apertura</label>
                  <input
                    type="time"
                    value={tenant?.orarioApertura || '08:00'}
                    onChange={(e) => updateTenant('orarioApertura', e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Orario Chiusura</label>
                  <input
                    type="time"
                    value={tenant?.orarioChiusura || '20:00'}
                    onChange={(e) => updateTenant('orarioChiusura', e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>
              </div>
              
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-3">Giorni di Apertura</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {['Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato', 'Domenica'].map((giorno) => (
                    <label key={giorno} className="flex items-center gap-2">
                      <input type="checkbox" defaultChecked className="w-4 h-4" />
                      <span className="text-sm">{giorno}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'contatti' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold">Informazioni di Contatto</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Telefono Principale</label>
                  <input
                    type="tel"
                    value={tenant?.telefono || ''}
                    onChange={(e) => updateTenant('telefono', e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <input
                    type="email"
                    value={tenant?.email || ''}
                    onChange={(e) => updateTenant('email', e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Sito Web</label>
                  <input
                    type="url"
                    value={tenant?.sitoWeb || ''}
                    onChange={(e) => updateTenant('sitoWeb', e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg"
                    placeholder="https://..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">WhatsApp</label>
                  <input
                    type="tel"
                    value={tenant?.whatsapp || ''}
                    onChange={(e) => updateTenant('whatsapp', e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Facebook</label>
                  <input
                    type="url"
                    value={tenant?.facebook || ''}
                    onChange={(e) => updateTenant('facebook', e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg"
                    placeholder="https://facebook.com/..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Instagram</label>
                  <input
                    type="text"
                    value={tenant?.instagram || ''}
                    onChange={(e) => updateTenant('instagram', e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg"
                    placeholder="@username"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'tema' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold">Personalizzazione Tema</h2>
              <p className="text-gray-600">Seleziona i colori e lo stile del tuo stabilimento</p>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Colore Primario</label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={tenant?.colorePrimario || '#3B82F6'}
                      onChange={(e) => updateTenant('colorePrimario', e.target.value)}
                      className="w-16 h-10 rounded border cursor-pointer"
                    />
                    <input
                      type="text"
                      value={tenant?.colorePrimario || '#3B82F6'}
                      onChange={(e) => updateTenant('colorePrimario', e.target.value)}
                      className="flex-1 px-4 py-2 border rounded-lg"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Colore Secondario</label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={tenant?.coloreSecondario || '#10B981'}
                      onChange={(e) => updateTenant('coloreSecondario', e.target.value)}
                      className="w-16 h-10 rounded border cursor-pointer"
                    />
                    <input
                      type="text"
                      value={tenant?.coloreSecondario || '#10B981'}
                      onChange={(e) => updateTenant('coloreSecondario', e.target.value)}
                      className="flex-1 px-4 py-2 border rounded-lg"
                    />
                  </div>
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-3">Anteprima Tema</h3>
                <div 
                  className="h-32 rounded-lg flex items-center justify-center text-white text-xl font-bold"
                  style={{ 
                    background: `linear-gradient(135deg, ${tenant?.colorePrimario || '#3B82F6'}, ${tenant?.coloreSecondario || '#10B981'})`
                  }}
                >
                  {tenant?.nomeStabilimento || 'Il tuo Stabilimento'}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;