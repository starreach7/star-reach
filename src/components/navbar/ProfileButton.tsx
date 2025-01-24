import React, { useState, useRef } from 'react';
import { Star } from 'lucide-react';
import { useAuth } from '../../store/authStore';
import ProfileDropdown from './ProfileDropdown';
import useOnClickOutside from '../../hooks/useOnClickOutside';

interface ProfileButtonProps {
  isMobile?: boolean;
}

const ProfileButton: React.FC<ProfileButtonProps> = ({ isMobile = false }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user } = useAuth();
  const dropdownRef = useRef(null);

  useOnClickOutside(dropdownRef, () => setIsDropdownOpen(false));

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="relative flex items-center justify-center w-10 h-10 rounded-full focus:outline-none group"
      >
        {user?.profileImage ? (
          <img
            src={user.profileImage}
            alt={user.username}
            className="w-full h-full rounded-full object-cover border-2 border-transparent group-hover:border-emerald-500 transition-colors"
          />
        ) : (
          <div className="w-full h-full rounded-full bg-emerald-600/20 flex items-center justify-center group-hover:bg-emerald-600/30 transition-colors">
            <Star className="w-5 h-5 text-emerald-400" />
          </div>
        )}
        <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3">
          <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75 animate-ping" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
        </div>
      </button>

      <ProfileDropdown 
        isOpen={isDropdownOpen} 
        onClose={() => setIsDropdownOpen(false)}
        isMobile={isMobile}
      />
    </div>
  );
};

export default ProfileButton;