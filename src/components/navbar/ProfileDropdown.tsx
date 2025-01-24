import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../store/authStore';
import { LogOut, Star } from 'lucide-react';
import { getMenuItems } from './MenuItems';

interface ProfileDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  isMobile?: boolean;
}

const ProfileDropdown: React.FC<ProfileDropdownProps> = ({ isOpen, onClose, isMobile = false }) => {
  const { user, logout } = useAuth();
  const userRole = 'creator'; // Mock user role

  if (!isOpen) return null;

  const menuItems = getMenuItems(userRole);

  const dropdownStyles = isMobile
    ? 'fixed inset-x-0 top-20 mx-4 rounded-xl bg-gray-800 shadow-lg ring-1 ring-gray-700 z-50'
    : 'absolute right-0 top-full mt-2 w-72 rounded-xl bg-gray-800 shadow-lg ring-1 ring-gray-700 z-50';

  return (
    <>
      {!isMobile && <div className="fixed inset-0 z-40" onClick={onClose} />}
      <div className={dropdownStyles}>
        <div className="p-4">
          <div className="flex items-center gap-3 mb-4">
            {user?.profileImage ? (
              <img
                src={user.profileImage}
                alt={user.username}
                className="w-12 h-12 rounded-full border-2 border-emerald-500"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-emerald-600/20 flex items-center justify-center">
                <Star className="w-6 h-6 text-emerald-400" />
              </div>
            )}
            <div>
              <div className="font-medium text-white">
                {user?.username || 'Guest User'}
              </div>
              <div className="text-sm text-gray-400">{user?.email}</div>
            </div>
          </div>

          <div className="space-y-1">
            {menuItems.map((item, index) => (
              <React.Fragment key={item.label}>
                {index > 0 && index % 4 === 0 && (
                  <div className="my-2 border-t border-gray-700" />
                )}
                <Link
                  to={item.to}
                  className="flex items-center gap-3 px-3 py-2 text-gray-300 rounded-lg hover:bg-gray-700/50 transition-colors"
                  onClick={onClose}
                >
                  <item.icon className="w-5 h-5 text-gray-400" />
                  <span>{item.label}</span>
                  {item.info && (
                    <span className="ml-auto text-sm text-gray-400">
                      {item.info}
                    </span>
                  )}
                </Link>
              </React.Fragment>
            ))}

            <div className="my-2 border-t border-gray-700" />
            
            <button
              onClick={() => {
                logout();
                onClose();
              }}
              className="w-full flex items-center gap-3 px-3 py-2 text-red-400 rounded-lg hover:bg-gray-700/50 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileDropdown;