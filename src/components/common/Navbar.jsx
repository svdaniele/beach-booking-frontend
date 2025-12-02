import { useState } from 'react';
import authAPI from '../../api/auth';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isAuthenticated = authAPI.isAuthenticated();
  const user = authAPI.getCurrentUser();

  const handleLogout = () => {
    authAPI.logout();
    window.location.href = '/';
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2">
            <span className="text-2xl">🏖️</span>
            <span className="text-xl font-bold text-primary-600">Beach Booking</span>
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <a href="/" className="text-gray-700 hover:text-primary-600 font-medium">Home</a>
            <a href="/prenota" className="text-gray-700 hover:text-primary-600 font-medium">Prenota</a>
            
            {isAuthenticated ? (
              <>
                <a href="/dashboard" className="text-gray-700 hover:text-primary-600 font-medium">Dashboard</a>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-600">{user?.nome}</span>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <a href="/login" className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                  Accedi
                </a>
                <a href="/register" className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
                  Registrati
                </a>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2"
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <a href="/" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">Home</a>
            <a href="/prenota" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">Prenota</a>
            
            {isAuthenticated ? (
              <>
                <a href="/dashboard" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">Dashboard</a>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <a href="/login" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">Accedi</a>
                <a href="/register" className="block px-4 py-2 bg-primary-600 text-white rounded-lg text-center">Registrati</a>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;