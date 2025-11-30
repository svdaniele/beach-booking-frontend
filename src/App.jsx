import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/auth/Login';
import BookingPage from './pages/public/BookingPage';
import DashboardLayout from './pages/dashboard/DashboardLayout';
import Overview from './pages/dashboard/Overview';
import MyPrenotazioni from './pages/dashboard/MyPrenotazioni';
import ProtectedRoute from './components/auth/ProtectedRoute';
import useAuthStore from './store/authStore';

function App() {
  const { user } = useAuthStore();
  const isAdmin = user && ['TENANT_ADMIN', 'SUPER_ADMIN', 'STAFF'].includes(user.ruolo);

  return (
    <div className="App">
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/booking" element={<BookingPage />} />
        
        {/* Dashboard Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          {/* Admin o Customer - route diverse */}
          <Route
            index
            element={isAdmin ? <Overview /> : <MyPrenotazioni />}
          />
          
          {/* Admin Routes */}
          {isAdmin && (
            <>
              <Route path="prenotazioni" element={<div>Prenotazioni Admin - Coming Soon</div>} />
              <Route path="ombrelloni" element={<div>Ombrelloni - Coming Soon</div>} />
              <Route path="clienti" element={<div>Clienti - Coming Soon</div>} />
              <Route path="statistiche" element={<div>Statistiche - Coming Soon</div>} />
              <Route path="impostazioni" element={<div>Impostazioni - Coming Soon</div>} />
            </>
          )}
          
          {/* Customer Routes */}
          {!isAdmin && (
            <>
              <Route path="nuova-prenotazione" element={<Navigate to="/booking" replace />} />
              <Route path="profilo" element={<div>Profilo - Coming Soon</div>} />
            </>
          )}
        </Route>
        
        {/* 404 */}
        <Route path="*" element={<div className="min-h-screen flex items-center justify-center"><h1 className="text-4xl">404 - Not Found</h1></div>} />
      </Routes>
    </div>
  );
}

export default App;