import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Star } from 'lucide-react';
import { useAuth } from '../store/authStore';
import NavLink from './navbar/NavLink';
import MobileNavLink from './navbar/MobileNavLink';
import NotificationButton from './navbar/NotificationButton';
import ProfileButton from './navbar/ProfileButton';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const { user } = useAuth();

  console.log(user);
  

  // Mock notifications - in a real app, this would come from your backend
  const notifications = [
    {
      id: 1,
      title: "New Message",
      message: "You received a new video message!",
      time: "2 minutes ago",
      read: false
    },
    {
      id: 2,
      title: "Booking Confirmed",
      message: "Your video request has been accepted",
      time: "1 hour ago",
      read: true
    }
  ];

  return (
    <nav className="bg-gray-900/95 backdrop-blur-sm sticky top-0 z-50 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center space-x-2 group">
              <Star className="w-8 h-8 text-emerald-400 transform rotate-12 group-hover:rotate-45 transition-transform duration-300" />
              <span className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-teal-200 bg-clip-text text-transparent">
                StarReach
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:justify-center flex-1 px-8">
            <div className="flex space-x-2">
              <NavLink to="/explore">Browse</NavLink>
              <NavLink to="/categories">Categories</NavLink>
              <NavLink to="/business">Business</NavLink>
              <NavLink to="/become-creator">Become a Creator</NavLink>
              <NavLink to="/about">About</NavLink>
            </div>
          </div>

          {/* Desktop Right Section */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <NotificationButton
                  showNotifications={showNotifications}
                  setShowNotifications={setShowNotifications}
                  notifications={notifications}
                />
                <ProfileButton />
              </>
            ) : (
              <Link
                to="/login"
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2.5 rounded-lg transition duration-200 flex items-center text-base font-medium"
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile Right Section */}
          <div className="flex md:hidden items-center space-x-4">
            {user && (
              <>
                <NotificationButton
                  showNotifications={showNotifications}
                  setShowNotifications={setShowNotifications}
                  notifications={notifications}
                  isMobile={true}
                />
                <ProfileButton isMobile={true} />
              </>
            )}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-emerald-400 hover:bg-gray-800/50 focus:outline-none transition-colors"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <MobileNavLink to="/explore">Browse</MobileNavLink>
            <MobileNavLink to="/categories">Categories</MobileNavLink>
            <MobileNavLink to="/business">Business</MobileNavLink>
            <MobileNavLink to="/become-creator">Become a Creator</MobileNavLink>
            <MobileNavLink to="/about">About</MobileNavLink>
            {!user && (
              <Link
                to="/login"
                className="block w-full text-center bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2.5 rounded-lg transition duration-200 mt-4"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;