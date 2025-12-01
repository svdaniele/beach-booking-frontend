import { useState, useEffect } from 'react';
import profileAPI from '../../api/profile';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [user, setUser] = useState(null);
  const [sessions, setSessions] = useState([]);
  
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [preferences, setPreferences] = useState({
    emailNotifiche: true,
    pushNotifiche: false,
    newsletterMarketing: true,
    aggiornamentiProdotto: true,
    lingua: 'it',
    timezone: 'Europe/Rome'
  });

  useEffect(() => {
    loadProfile();
    if (activeTab === 'security') {
      loadSessions();
    }
  }, [activeTab]);

  const loadProfile = async () => {
    try {
      const data = await profileAPI.getMe();
      setUser(data);
      if (data.preferences) {
        setPreferences(data.preferences);
      }
    } catch (error) {
      console.error('Error loading profile:', error);
      alert('Errore nel caricamento del profilo');
    } finally {
      setLoading(false);
    }
  };

  const loadSessions = async () => {
    try {
      const data = await profileAPI.getSessions();
      setSessions(data || []);
    } catch (error) {
      console.error('Error loading sessions:', error);
    }
  };

  const handleSaveProfile = async () => {
    setSaving(true);
    try {
      await profileAPI.updateProfile(user);
      alert('Profilo aggiornato con successo!');
    } catch (error) {
      console.error('Error saving profile:', error);
      alert('Errore nel salvataggio del profilo');
    } finally {
      setSaving(false);
    }
  };

  const handleChangePassword = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('Le password non coincidono!');
      return;
    }
    if (passwordData.newPassword.length < 8) {
      alert('La password deve essere di almeno 8 caratteri');
      return;
    }

    try {
      await profileAPI.changePassword(passwordData.currentPassword, passwordData.newPassword);
      alert('Password modificata con successo!');
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (error) {
      console.error('Error changing password:', error);
      alert(error.response?.data?.message || 'Errore nel cambio password');
    }
  };

  const handleSavePreferences = async () => {
    try {
      await profileAPI.updatePreferences(preferences);
      alert('Preferenze salvate con successo!');
    } catch (error) {
      console.error('Error saving preferences:', error);
      alert('Errore nel salvataggio delle preferenze');
    }
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const data = await profileAPI.uploadAvatar(file);
      setUser(prev => ({ ...prev, avatarUrl: data.avatarUrl }));
      alert('Avatar aggiornato con successo!');
    } catch (error) {
      console.error('Error uploading avatar:', error);
      alert('Errore nel caricamento dell\'avatar');
    }
  };

  const handleTerminateSession = async (sessionId) => {
    if (!confirm('Terminare questa sessione?')) return;
    try {
      await profileAPI.terminateSession(sessionId);
      loadSessions();
    } catch (error) {
      console.error('Error terminating session:', error);
      alert('Errore nella terminazione della sessione');
    }
  };

  const updateUser = (field, value) => {
    setUser(prev => ({ ...prev, [field]: value }));
  };

  const tabs = [
    { id: 'profile', label: 'Profilo', icon: '👤' },
    { id: 'security', label: 'Sicurezza', icon: '🔒' },
    { id: 'preferences', label: 'Preferenze', icon: '⚙️' }
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
      <h1 className="text-3xl font-bold">Il Mio Profilo</h1>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="border-b">
          <div className="flex">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 font-medium border-b-2 transition-colors ${
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
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <div className="flex items-center gap-6">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white text-3xl font-bold overflow-hidden">
                    {user?.avatarUrl ? (
                      <img src={user.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                    ) : (
                      `${user?.nome?.[0] || ''}${user?.cognome?.[0] || ''}`
                    )}
                  </div>
                  <label className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-lg cursor-pointer hover:bg-gray-50 border">
                    📷
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarChange}
                      className="hidden"
                    />
                  </label>
                </div>
                <div>
                  <h2 className="text-2xl font-bold">{user?.nome} {user?.cognome}</h2>
                  <p className="text-gray-600">{user?.ruolo}</p>
                  <p className="text-sm text-gray-500 mt-1">{user?.email}</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Nome</label>
                  <input
                    type="text"
                    value={user?.nome || ''}
                    onChange={(e) => updateUser('nome', e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Cognome</label>
                  <input
                    type="text"
                    value={user?.cognome || ''}
                    onChange={(e) => updateUser('cognome', e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <input
                    type="email"
                    value={user?.email || ''}
                    onChange={(e) => updateUser('email', e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Telefono</label>
                  <input
                    type="tel"
                    value={user?.telefono || ''}
                    onChange={(e) => updateUser('telefono', e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Ruolo</label>
                  <input
                    type="text"
                    value={user?.ruolo || ''}
                    disabled
                    className="w-full px-4 py-2 border rounded-lg bg-gray-50 text-gray-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Codice Fiscale</label>
                  <input
                    type="text"
                    value={user?.codiceFiscale || ''}
                    onChange={(e) => updateUser('codiceFiscale', e.target.value.toUpperCase())}
                    className="w-full px-4 py-2 border rounded-lg"
                    maxLength={16}
                  />
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={handleSaveProfile}
                  disabled={saving}
                  className="flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50"
                >
                  {saving ? '⏳ Salvataggio...' : '💾 Salva Modifiche'}
                </button>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold">Modifica Password</h2>
              <div className="max-w-md space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Password Attuale</label>
                  <input
                    type="password"
                    value={passwordData.currentPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Nuova Password</label>
                  <input
                    type="password"
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                  <p className="text-sm text-gray-600 mt-1">Minimo 8 caratteri</p>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Conferma Nuova Password</label>
                  <input
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>
                <button
                  onClick={handleChangePassword}
                  className="flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                >
                  🔐 Cambia Password
                </button>
              </div>

              <div className="border-t pt-6 mt-8">
                <h3 className="text-lg font-bold mb-4">Sessioni Attive</h3>
                {sessions.length > 0 ? (
                  <div className="space-y-3">
                    {sessions.map((session, idx) => (
                      <div key={session.id || idx} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <p className="font-semibold">{session.device || 'Dispositivo sconosciuto'}</p>
                          <p className="text-sm text-gray-600">
                            {session.location || 'Posizione sconosciuta'} • 
                            {session.current ? ' Attivo ora' : ` ${session.lastActive || 'Ultimo accesso sconosciuto'}`}
                          </p>
                        </div>
                        {session.current ? (
                          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                            Corrente
                          </span>
                        ) : (
                          <button 
                            onClick={() => handleTerminateSession(session.id)}
                            className="text-red-600 hover:text-red-700 text-sm font-semibold"
                          >
                            Termina
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-semibold">Sessione Corrente</p>
                      <p className="text-sm text-gray-600">Attivo ora</p>
                    </div>
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                      Corrente
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'preferences' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold">Preferenze Notifiche</h2>
              <div className="space-y-4">
                <label className="flex items-center gap-3 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={preferences.emailNotifiche}
                    onChange={(e) => setPreferences({ ...preferences, emailNotifiche: e.target.checked })}
                    className="w-5 h-5"
                  />
                  <div>
                    <p className="font-semibold">Notifiche Email</p>
                    <p className="text-sm text-gray-600">Ricevi notifiche via email per aggiornamenti importanti</p>
                  </div>
                </label>
                <label className="flex items-center gap-3 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={preferences.pushNotifiche}
                    onChange={(e) => setPreferences({ ...preferences, pushNotifiche: e.target.checked })}
                    className="w-5 h-5"
                  />
                  <div>
                    <p className="font-semibold">Notifiche Push</p>
                    <p className="text-sm text-gray-600">Ricevi notifiche push sul browser</p>
                  </div>
                </label>
                <label className="flex items-center gap-3 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={preferences.newsletterMarketing}
                    onChange={(e) => setPreferences({ ...preferences, newsletterMarketing: e.target.checked })}
                    className="w-5 h-5"
                  />
                  <div>
                    <p className="font-semibold">Newsletter Marketing</p>
                    <p className="text-sm text-gray-600">Ricevi newsletter e offerte promozionali</p>
                  </div>
                </label>
                <label className="flex items-center gap-3 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={preferences.aggiornamentiProdotto}
                    onChange={(e) => setPreferences({ ...preferences, aggiornamentiProdotto: e.target.checked })}
                    className="w-5 h-5"
                  />
                  <div>
                    <p className="font-semibold">Aggiornamenti Prodotto</p>
                    <p className="text-sm text-gray-600">Ricevi aggiornamenti su nuove funzionalità</p>
                  </div>
                </label>
              </div>

              <div className="border-t pt-6 mt-8">
                <h3 className="text-lg font-bold mb-4">Impostazioni Regionali</h3>
                <div className="grid md:grid-cols-2 gap-4 max-w-md">
                  <div>
                    <label className="block text-sm font-medium mb-1">Lingua</label>
                    <select
                      value={preferences.lingua}
                      onChange={(e) => setPreferences({ ...preferences, lingua: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg"
                    >
                      <option value="it">Italiano</option>
                      <option value="en">English</option>
                      <option value="fr">Français</option>
                      <option value="de">Deutsch</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Fuso Orario</label>
                    <select
                      value={preferences.timezone}
                      onChange={(e) => setPreferences({ ...preferences, timezone: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg"
                    >
                      <option value="Europe/Rome">Europa/Roma (GMT+1)</option>
                      <option value="Europe/London">Europa/Londra (GMT+0)</option>
                      <option value="Europe/Paris">Europa/Parigi (GMT+1)</option>
                      <option value="America/New_York">America/New York (GMT-5)</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={handleSavePreferences}
                  className="flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                >
                  💾 Salva Preferenze
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;