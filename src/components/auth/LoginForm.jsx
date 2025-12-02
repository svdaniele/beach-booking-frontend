import { useState } from 'react';
import authAPI from '../../api/auth';

const LoginForm = ({ onSuccess, onSwitchToRegister }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = await authAPI.login(formData.email, formData.password);
      if (onSuccess) onSuccess(data);
      window.location.href = '/dashboard';
    } catch (err) {
      setError(err.response?.data?.message || 'Credenziali non valide');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-center mb-2">Accedi</h2>
        <p className="text-gray-600 text-center mb-8">Benvenuto! Inserisci le tue credenziali</p>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500"
              placeholder="tua@email.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 font-semibold disabled:opacity-50"
          >
            {loading ? 'Accesso in corso...' : 'Accedi'}
          </button>
        </div>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Non hai un account?{' '}
            <button
              onClick={onSwitchToRegister}
              className="text-primary-600 font-semibold hover:text-primary-700"
            >
              Registrati
            </button>
          </p>
        </div>

        <div className="mt-4 text-center">
          <button className="text-sm text-gray-500 hover:text-gray-700">
            Password dimenticata?
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;