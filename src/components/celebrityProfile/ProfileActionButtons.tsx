import React from 'react';
import { Link } from 'react-router-dom';
import { Settings, DollarSign } from 'lucide-react';

const ProfileActions = () => {
  return (
    <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
      <Link
        to="/profile/edit"
        className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-700/50 hover:bg-gray-700 text-white rounded-lg transition-colors w-full sm:w-auto"
      >
        <Settings className="w-4 h-4" />
        <span>Edit Profile</span>
      </Link>
      <Link
        to={`/profile/pricing`}
        className="flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors w-full sm:w-auto"
      >
        <DollarSign className="w-4 h-4" />
        <span>Edit Pricing</span>
      </Link>
    </div>
  );
};

export default ProfileActions;