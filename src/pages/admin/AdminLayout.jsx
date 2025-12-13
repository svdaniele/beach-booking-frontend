import { useState } from 'react';
import useAuth from '../../hooks/useAuth';

const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { user, logout } = useAuth();

  const menuItems = [
    { path: '/admin', label: 'Dashboard', icon: '📊' },
    { path: '/admin/tenants', label: 'Gestione Tenant', icon: '🏢' },
    { path: '/admin/users', label: 'Utenti', icon: '👥' },
    { path: '/admin/revenue', label: 'Revenue', icon: '💰' },
    { path: '/admin/analytics', label: 'Analytics', icon: '📈' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className={`bg-gray-900 text-white border-r-4 border-black transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-20'} relative`}>
        <div className="p-4 border-b-2 border-black bg-red-600">
          <div className="flex items-center justify-between">
            {sidebarOpen && (
              <div>
                <h2 className="font-bold text-lg">⚡ SUPER ADMIN</h2>
                <p className="text-xs font-semibold">{user?.nome}</p>
              </div>
            )}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-red-700 font-bold"
            >
              {sidebarOpen ? '◀' : '▶'}
            </button>
          </div>
        </div>

        <nav className="p-4 pb-32">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.path}>
                <a
                  href={item.path}
                  className={`flex items-center gap-3 px-4 py-3 transition-colors font-semibold ${
                    window.location.pathname === item.path 
                      ? 'bg-red-600' 
                      : 'hover:bg-gray-800'
                  }`}
                >
                  <span className="text-xl">{item.icon}</span>
                  {sidebarOpen && <span>{item.label}</span>}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="absolute bottom-4 left-4 right-4">
          <a
            href="/dashboard"
            className="w-full flex items-center gap-3 px-4 py-3 mb-2 bg-gray-800 hover:bg-gray-700 transition-colors font-bold"
          >
            <span className="text-xl">👤</span>
            {sidebarOpen && <span>User Dashboard</span>}
          </a>
          <button
            onClick={() => {
              logout();
              window.location.href = '/';
            }}
            className="w-full flex items-center gap-3 px-4 py-3 bg-red-600 hover:bg-red-700 transition-colors font-bold"
          >
            <span className="text-xl">🚪</span>
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto">
        <header className="bg-white border-b-4 border-red-600 sticky top-0 z-10">
          <div className="px-6 py-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl">⚡</span>
              <div>
                <h1 className="text-3xl font-bold">Super Admin Panel</h1>
                <p className="text-sm text-gray-600 font-semibold">Gestione Piattaforma</p>
              </div>
            </div>
          </div>
        </header>

        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;