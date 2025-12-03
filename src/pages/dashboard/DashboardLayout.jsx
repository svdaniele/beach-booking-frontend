import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { user, logout } = useAuth();

  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: '📊', roles: ['all'] },
    { path: '/dashboard/my-prenotazioni', label: 'Le Mie Prenotazioni', icon: '📅', roles: ['CUSTOMER'] },
    { path: '/dashboard/prenotazioni', label: 'Prenotazioni', icon: '📋', roles: ['STAFF', 'TENANT_ADMIN'] },
    { path: '/dashboard/ombrelloni', label: 'Ombrelloni', icon: '🏖️', roles: ['STAFF', 'TENANT_ADMIN'] },
    { path: '/dashboard/clienti', label: 'Clienti', icon: '👥', roles: ['STAFF', 'TENANT_ADMIN'] },
    { path: '/dashboard/pagamenti', label: 'Pagamenti', icon: '💳', roles: ['STAFF', 'TENANT_ADMIN'] },
    { path: '/dashboard/settings', label: 'Impostazioni', icon: '⚙️', roles: ['TENANT_ADMIN'] },
    { path: '/dashboard/profile', label: 'Profilo', icon: '👤', roles: ['all'] },
  ];

  const canAccessMenu = (item) => {
    if (item.roles.includes('all')) return true;
    if (user?.ruolo === 'SUPER_ADMIN') return true;
    return item.roles.includes(user?.ruolo);
  };

  const visibleMenuItems = menuItems.filter(canAccessMenu);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className={`bg-white shadow-lg transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-20'} relative`}>
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            {sidebarOpen && (
              <div>
                <h2 className="font-bold text-lg">🏖️ Beach Booking</h2>
                <p className="text-xs text-gray-500">{user?.nome} {user?.cognome}</p>
              </div>
            )}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              {sidebarOpen ? '◀' : '▶'}
            </button>
          </div>
        </div>

        <nav className="p-4 pb-24">
          <ul className="space-y-2">
            {visibleMenuItems.map((item) => (
              <li key={item.path}>
                <a
                  href={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-primary-50 hover:text-primary-600 transition-colors ${
                    window.location.pathname === item.path ? 'bg-primary-50 text-primary-600' : 'text-gray-700'
                  }`}
                >
                  <span className="text-xl">{item.icon}</span>
                  {sidebarOpen && <span className="font-medium">{item.label}</span>}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="absolute bottom-4 left-4 right-4">
          <button
            onClick={() => {
              logout();
              window.location.href = '/';
            }}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <span className="text-xl">🚪</span>
            {sidebarOpen && <span className="font-medium">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto">
        <header className="bg-white shadow-sm sticky top-0 z-10">
          <div className="px-6 py-4 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Benvenuto, {user?.nome}!</h1>
              <p className="text-sm text-gray-600">{user?.ruolo}</p>
            </div>
            <a href="/" className="text-gray-600 hover:text-gray-900">
              🏠 Torna al sito
            </a>
          </div>
        </header>

        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;