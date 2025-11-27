import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaEnvelope, FaLock, FaSignInAlt } from 'react-icons/fa';
import useAuthStore from '../../store/authStore';

const Login = () => {
  const navigate = useNavigate();
  const { login, loading, error, clearError } = useAuthStore();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    clearError();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await login(formData.email, formData.password);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-sand-50 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-2xl"
      >
        {/* Header */}
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          >
            <div className="mx-auto h-16 w-16 bg-primary-500 rounded-full flex items-center justify-center">
              <FaSignInAlt className="text-white text-2xl" />
            </div>
          </motion.div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Accedi al tuo account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Non hai un account?{' '}
            <Link
              to="/register"
              className="font-medium text-primary-600 hover:text-primary-500"
            >
              Registrati
            </Link>
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-red-50 border-l-4 border-red-500 p-4 rounded"
          >
            <p className="text-sm text-red-700">{error}</p>
          </motion.div>
        )}

        {/* Form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="appearance-none block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
                  placeholder="mario.rossi@email.com"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="appearance-none block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
                  placeholder="••••••••"
                />
              </div>
            </div>
          </div>

          {/* Remember & Forgot Password */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                Ricordami
              </label>
            </div>

            <Link
              to="/forgot-password"
              className="text-sm font-medium text-primary-600 hover:text-primary-500"
            >
              Password dimenticata?
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            {loading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Accesso in corso...
              </span>
            ) : (
              'Accedi'
            )}
          </button>
        </form>

        {/* Demo Credentials */}
        <div className="mt-6 border-t pt-6">
          <p className="text-xs text-center text-gray-500 mb-2">
            Credenziali demo:
          </p>
          <div className="bg-gray-50 p-3 rounded text-xs text-gray-600 space-y-1">
            <p><strong>Admin:</strong> admin@lidomarechiaro.it / Admin123!</p>
            <p><strong>Cliente:</strong> cliente@test.it / Admin123!</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;