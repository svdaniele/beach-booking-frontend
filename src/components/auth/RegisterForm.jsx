import { useState } from 'react';
import authAPI from '../../api/auth';

const RegisterForm = ({ onSuccess, onSwitchToLogin }) => {
  const [userType, setUserType] = useState('customer'); // 'customer' or 'tenant'
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    nome: '',
    cognome: '',
    telefono: '',
    // Solo per tenant
    nomeStabilimento: '',
    indirizzo: '',
    citta: '',
    provincia: '',
    cap: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Le password non coincidono');
      return;
    }

    if (formData.password.length < 8) {
      setError('La password deve essere di almeno 8 caratteri');
      return;
    }

    setLoading(true);

    try {
      if (userType === 'tenant') {
        await authAPI.registerTenant({
          email: formData.email,
          password: formData.password,
          nomeAdmin: formData.nome,
          cognomeAdmin: formData.cognome,
          telefono: formData.telefono,
          nomeStabilimento: formData.nomeStabilimento,
          indirizzo: formData.indirizzo,
          citta: formData.citta,
          provincia: formData.provincia,
          cap: formData.cap
        });
      } else {
        await authAPI.registerCustomer({
          email: formData.email,
          password: formData.password,
          nome: formData.nome,
          cognome: formData.cognome,
          telefono: formData.telefono
        });
      }
      
      alert('Registrazione completata! Effettua il login.');
      if (onSwitchToLogin) onSwitchToLogin();
    } catch (err) {
      setError(err.response?.data?.message || 'Errore durante la registrazione');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-center mb-2">Registrati</h2>
        <p className="text-gray-600 text-center mb-6">Crea il tuo account</p>

        {/* User Type Selection */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setUserType('customer')}
            className={`flex-1 py-3 rounded-lg font-semibold transition-colors ${
              userType === 'customer'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            👤 Cliente
          </button>
          <button
            onClick={() => setUserType('tenant')}
            className={`flex-1 py-3 rounded-lg font-semibold transition-colors ${
              userType === 'tenant'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            🏖️ Stabilimento
          </button>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <div className="space-y-4">
          {/* Dati Personali */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Nome *</label>
              <input
                type="text"
                value={formData.nome}
                onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Cognome *</label>
              <input
                type="text"
                value={formData.cognome}
                onChange={(e) => setFormData({ ...formData, cognome: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email *</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Telefono *</label>
            <input
              type="tel"
              value={formData.telefono}
              onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>

          {/* Dati Stabilimento (solo per tenant) */}
          {userType === 'tenant' && (
            <>
              <div className="border-t pt-4">
                <h3 className="font-semibold mb-3">Dati Stabilimento</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Nome Stabilimento *</label>
                    <input
                      type="text"
                      value={formData.nomeStabilimento}
                      onChange={(e) => setFormData({ ...formData, nomeStabilimento: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Indirizzo *</label>
                    <input
                      type="text"
                      value={formData.indirizzo}
                      onChange={(e) => setFormData({ ...formData, indirizzo: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg"
                      required
                    />
                  </div>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Città *</label>
                      <input
                        type="text"
                        value={formData.citta}
                        onChange={(e) => setFormData({ ...formData, citta: e.target.value })}
                        className="w-full px-4 py-2 border rounded-lg"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Provincia *</label>
                      <input
                        type="text"
                        value={formData.provincia}
                        onChange={(e) => setFormData({ ...formData, provincia: e.target.value.toUpperCase() })}
                        className="w-full px-4 py-2 border rounded-lg"
                        maxLength={2}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">CAP *</label>
                      <input
                        type="text"
                        value={formData.cap}
                        onChange={(e) => setFormData({ ...formData, cap: e.target.value })}
                        className="w-full px-4 py-2 border rounded-lg"
                        maxLength={5}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Password */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Password *</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg"
                required
              />
              <p className="text-xs text-gray-500 mt-1">Min 8 caratteri</p>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Conferma Password *</label>
              <input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg"
                required
              />
            </div>
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 font-semibold disabled:opacity-50"
          >
            {loading ? 'Registrazione in corso...' : 'Registrati'}
          </button>
        </div>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Hai già un account?{' '}
            <button
              onClick={onSwitchToLogin}
              className="text-primary-600 font-semibold hover:text-primary-700"
            >
              Accedi
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;