import { createBrowserRouter } from 'react-router-dom';
import ProtectedRoute from './components/auth/ProtectedRoute';

// Layouts
import DashboardLayout from './pages/dashboard/DashboardLayout';

// Public Pages
import Home from './pages/public/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

// Dashboard Pages
import Overview from './pages/dashboard/Overview';
import Prenotazioni from './pages/dashboard/Prenotazioni';
import PrenotazioneDetail from './pages/dashboard/PrenotazioneDetail';
import MyPrenotazioni from './pages/dashboard/MyPrenotazioni';
import Ombrelloni from './pages/dashboard/Ombrelloni';
import Clienti from './pages/dashboard/Clienti';
import Pagamenti from './pages/dashboard/Pagamenti';
import Settings from './pages/dashboard/Settings';
import Profile from './pages/dashboard/Profile';

const router = createBrowserRouter([
  // Public Routes
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },

  // Protected Dashboard Routes
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Overview />,
      },
      {
        path: 'prenotazioni',
        element: <Prenotazioni />,
      },
      {
        path: 'prenotazioni/:id',
        element: <PrenotazioneDetail />,
      },
      {
        path: 'my-prenotazioni',
        element: <MyPrenotazioni />,
      },
      {
        path: 'ombrelloni',
        element: <Ombrelloni />,
      },
      {
        path: 'clienti',
        element: (
          <ProtectedRoute requiredRole="STAFF">
            <Clienti />
          </ProtectedRoute>
        ),
      },
      {
        path: 'pagamenti',
        element: (
          <ProtectedRoute requiredRole="STAFF">
            <Pagamenti />
          </ProtectedRoute>
        ),
      },
      {
        path: 'settings',
        element: (
          <ProtectedRoute requiredRole="TENANT_ADMIN">
            <Settings />
          </ProtectedRoute>
        ),
      },
      {
        path: 'profile',
        element: <Profile />,
      },
    ],
  },
]);

export default router;