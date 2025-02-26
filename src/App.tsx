import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
import { useAuth } from './store/authStore';
import socketService from './services/api/socket.service';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Categories from './pages/Categories';
import Explore from './pages/Explore';
import CelebrityProfile from './pages/CelebrityProfile';
import Login from './pages/Login';
import Register from './pages/Register';
import BecomeCreator from './pages/BecomeCreator';
import PrivateRoute from './components/PrivateRoute';
import About from './pages/AboutUs';
import CategoryPage from './pages/CategoryPage';
import TalentOnboarding from './pages/TalentOnboarding';
import EditProfile from './pages/EditProfile';
import EditPricing from './pages/EditPricing';
import Settings from './pages/Settings';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Business from './pages/Business';

function App() {
  const { user } = useAuth();

  useEffect(() => {
    // Initialize socket connection when user is logged in
    if (user?.id) {
      socketService.initialize(user.id);
    }

    // Cleanup socket connection on unmount or when user logs out
    return () => {
      socketService.disconnect();
    };
  }, [user?.id]);

  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-gray-100">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/business" element={<Business />} />
          <Route path="/categories/:categoryId" element={<CategoryPage />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/become-creator" element={<BecomeCreator />} />
          <Route path="/talent-onboarding" element={<TalentOnboarding />} />
          <Route path="/celebrity/:id" element={
            <PrivateRoute>
              <CelebrityProfile />
            </PrivateRoute>
          } />
          <Route path="/profile/edit" element={
            <PrivateRoute>
              <EditProfile />
            </PrivateRoute>
          } />
          <Route path="/profile/pricing" element={
            <PrivateRoute>
              <EditPricing />
            </PrivateRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/settings" element={
            <PrivateRoute>
              <Settings />
            </PrivateRoute>
          } />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:sessionToken" element={<ResetPassword />} />
        </Routes>
        <Footer />
        <Toaster
          position="top-right"
          containerStyle={{
            position: 'fixed',
            zIndex: 9999,
            top: '80px',
            right: '20px',
          }}
          toastOptions={{
            duration: 3000,
            style: {
              background: '#1f2937',
              color: '#fff',
              border: '1px solid #374151',
            },
            success: {
              iconTheme: {
                primary: '#10b981',
                secondary: '#fff',
              },
            },
            error: {
              iconTheme: {
                primary: '#ef4444',
                secondary: '#fff',
              },
            },
          }}
        />
      </div>
    </Router>
  );
}

export default App;