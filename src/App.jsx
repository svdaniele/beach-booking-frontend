import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/auth/Login';
import BookingPage from './pages/public/BookingPage';
import DashboardLayout from './pages/dashboard/DashboardLayout';
import Overview from './pages/dashboard/Overview';
import MyPrenotazioni from './pages/dashboard/MyPrenotazioni';
import Prenotazioni from './pages/dashboard/Prenotazioni';
import Ombrelloni from './pages/dashboard/Ombrelloni';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Clienti from './pages/dashboard/Clienti';
import Settings from './pages/dashboard/Settings';
import useAuthStore from './store/authStore';

function App() {
  const { user } = useAuthStore();
  const isAdmin = user && ['TENANT_ADMIN', 'SUPER_ADMIN', 'STAFF'].includes(user.ruolo);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/booking" element={<BookingPage />} />
        
        <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
          <Route index element={isAdmin ? <Overview /> : <MyPrenotazioni />} />
          
          {isAdmin && (
            <>
              <Route path="prenotazioni" element={<Prenotazioni />} />
              <Route path="ombrelloni" element={<Ombrelloni />} />
              <Route path="clienti" element={<Clienti />} />
              <Route path="statistiche" element={<div>Statistiche - Coming Soon</div>} />
              <Route path="impostazioni" element={<Settings />} />
            </>
          )}
          
          {!isAdmin && (
            <>
              <Route path="nuova-prenotazione" element={<Navigate to="/booking" replace />} />
              <Route path="profilo" element={<div>Profilo - Coming Soon</div>} />
            </>
          )}
        </Route>
        
        <Route path="*" element={<div className="min-h-screen flex items-center justify-center"><h1 className="text-4xl">404</h1></div>} />
      </Routes>
    </div>
  );
}

export default App;