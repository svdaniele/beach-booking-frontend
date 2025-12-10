import { useState } from 'react';
import authAPI from '../../api/auth';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isAuthenticated = authAPI.isAuthenticated();
  const user = authAPI.getCurrentUser();

  const handleLogout = async () => {
    try {
      await authAPI.logout();
    } catch (error) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
    window.location.href = '/';
  };

  return (
    <nav className="bg-yellow-400 border-b-4 border-black sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2">
            <span className="text-2xl">🏖️</span>
            <span className="text-xl font-bold uppercase text-black tracking-tight">BEACH BOOKING</span>
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-4">
            <a href="/" className="px-3 py-1 text-black font-bold uppercase hover:bg-black hover:text-yellow-400 border-2 border-transparent hover:border-black transition-colors">Home</a>
            <a href="/prenota" className="px-3 py-1 text-black font-bold uppercase hover:bg-black hover:text-yellow-400 border-2 border-transparent hover:border-black transition-colors">Prenota</a>
            
            {isAuthenticated ? (
              <>
                <a href="/dashboard" className="px-3 py-1 text-black font-bold uppercase hover:bg-black hover:text-yellow-400 border-2 border-transparent hover:border-black transition-colors">Dashboard</a>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-black uppercase">{user?.nome}</span>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 bg-red-500 text-white font-bold uppercase border-2 border-black hover:bg-red-600"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <a href="/login" className="px-4 py-2 bg-white text-black font-bold uppercase border-2 border-black hover:bg-black hover:text-white transition-colors">
                  Accedi
                </a>
                <a href="/register" className="px-4 py-2 bg-black text-white font-bold uppercase border-2 border-black hover:bg-white hover:text-black transition-colors">
                  Registrati
                </a>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 bg-black text-white font-bold border-2 border-black"
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-2 border-t-2 border-black pt-4">
            <a href="/" className="block px-4 py-2 text-black font-bold uppercase hover:bg-black hover:text-yellow-400 border-2 border-black">Home</a>
            <a href="/prenota" className="block px-4 py-2 text-black font-bold uppercase hover:bg-black hover:text-yellow-400 border-2 border-black">Prenota</a>
            
            {isAuthenticated ? (
              <>
                <a href="/dashboard" className="block px-4 py-2 text-black font-bold uppercase hover:bg-black hover:text-yellow-400 border-2 border-black">Dashboard</a>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 bg-red-500 text-white font-bold uppercase border-2 border-black"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <a href="/login" className="block px-4 py-2 bg-white text-black font-bold uppercase border-2 border-black text-center">Accedi</a>
                <a href="/register" className="block px-4 py-2 bg-black text-white font-bold uppercase border-2 border-black text-center">Registrati</a>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;