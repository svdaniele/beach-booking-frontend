import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/auth/Login';
import BookingPage from './pages/public/BookingPage';
import DashboardLayout from './pages/dashboard/DashboardLayout';
import Overview from './pages/dashboard/Overview';
import MyPrenotazioni from './pages/dashboard/MyPrenotazioni';
import Prenotazioni from './pages/dashboard/Prenotazioni';
import Ombrelloni from './pages/dashboard/Ombrelloni';
import Clienti from './pages/dashboard/Clienti';
import Pagamenti from './pages/dashboard/Pagamenti';
import Settings from './pages/dashboard/Settings';
import Profile from './pages/dashboard/Profile';
import ProtectedRoute from './components/auth/ProtectedRoute';
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
              <Route path="pagamenti" element={<Pagamenti />} />
              <Route path="settings" element={<Settings />} />
            </>
          )}
          
          <Route path="profile" element={<Profile />} />
          <Route path="my-prenotazioni" element={<MyPrenotazioni />} />
        </Route>
        
        <Route path="*" element={<div className="min-h-screen flex items-center justify-center"><h1 className="text-4xl">404</h1></div>} />
      </Routes>
    </div>
  );
}

export default App;