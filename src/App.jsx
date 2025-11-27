import { Routes, Route } from 'react-router-dom';
import Login from './pages/auth/Login';
import BookingPage from './pages/public/BookingPage';
import ProtectedRoute from './components/auth/ProtectedRoute';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<div className="min-h-screen flex items-center justify-center"><h1 className="text-4xl font-bold text-primary-600">Beach Booking - Homepage Coming Soon</h1></div>} />
        <Route path="/login" element={<Login />} />
        <Route path="/booking" element={<BookingPage />} />
        
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <div className="min-h-screen flex items-center justify-center">
                <h1 className="text-4xl font-bold text-primary-600">Dashboard - Coming Soon</h1>
              </div>
            </ProtectedRoute>
          }
        />
        
        <Route path="*" element={<div className="min-h-screen flex items-center justify-center"><h1 className="text-4xl">404 - Not Found</h1></div>} />
      </Routes>
    </div>
  );
}

export default App;