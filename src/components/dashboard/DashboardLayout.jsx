import { useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FaHome,
  FaCalendarAlt,
  FaUmbrella,
  FaUsers,
  FaChartBar,
  FaCog,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaUser,
} from 'react-icons/fa';
import useAuthStore from '../../store/authStore';

const DashboardLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuthStore();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const isAdmin = ['TENANT_ADMIN', 'SUPER_ADMIN', 'STAFF'].includes(user?.ruolo);

  const adminMenuItems = [
    { path: '/dashboard', icon: FaHome, label: 'Dashboard' },
    { path: '/dashboard/prenotazioni', icon: FaCalendarAlt, label: 'Prenotazioni' },
    { path: '/dashboard/ombrelloni', icon: FaUmbrella, label: 'Ombrelloni' },
    { path: '/dashboard/clienti', icon: FaUsers, label: 'Clienti' },
    { path: '/dashboard/statistiche', icon: FaChartBar, label: 'Statistiche' },
    { path: '/dashboard/impostazioni', icon: FaCog, label: 'Impostazioni' },
  ];

  const customerMenuItems = [
    { path: '/dashboard', icon: FaHome, label: 'Le Mie Prenotazioni' },
    { path: '/dashboard/nuova-prenotazione', icon: FaCalendarAlt, label: 'Nuova Prenotazione' },
    { path: '/dashboard/profilo', icon: FaUser, label: 'Profilo' },
  ];

  const menuItems = isAdmin ? adminMenuItems : customerMenuItems;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => {
    if (path === '/dashboard') {
      return location.pathname === '/dashboard';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: sidebarOpen ? 256 : 80 }}
        className="bg-white shadow-lg z-10"
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between p-4 border-b">
            {sidebarOpen && (
              <h1 className="text-xl font-bold text-primary-600">
                Beach Booking
              </h1>
            )}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg hover:bg-gray-100"
            >
              {sidebarOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>

          {/* Menu */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 p-3 rounded-lg transition ${
                    active
                      ? 'bg-primary-50 text-primary-600 font-medium'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="text-xl flex-shrink-0" />
                  {sidebarOpen && <span>{item.label}</span>}
                </Link>
              );
            })}
          </nav>

          {/* User Info & Logout */}
          <div className="p-4 border-t">
            <div className={`flex items-center gap-3 mb-3 ${!sidebarOpen && 'justify-center'}`}>
              <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                <span className="text-primary-600 font-bold">
                  {user?.nome?.charAt(0)}
                </span>
              </div>
              {sidebarOpen && (
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {user?.nomeCompleto}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {user?.email}
                  </p>
                </div>
              )}
            </div>
            <button
              onClick={handleLogout}
              className={`flex items-center gap-3 p-3 rounded-lg text-red-600 hover:bg-red-50 transition w-full ${
                !sidebarOpen && 'justify-center'
              }`}
            >
              <FaSignOutAlt className="text-xl" />
              {sidebarOpen && <span>Esci</span>}
            </button>
          </div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm px-6 py-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">
              {isAdmin ? 'Gestione Stabilimento' : 'Le Mie Prenotazioni'}
            </h2>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                {user?.tenantNome || 'Beach Booking'}
              </span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;