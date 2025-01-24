import React from 'react';
import { Camera } from 'lucide-react';

interface ProfileImageUploadProps {
  profileImage: string | null;
  userImage?: string;
  onImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ProfileImageUpload: React.FC<ProfileImageUploadProps> = ({
  profileImage,
  userImage,
  onImageChange
}) => {
  return (
    <div className="flex flex-col items-center">
      <div className="relative group">
        <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-700 flex items-center justify-center">
          {profileImage || userImage ? (
            <img 
              src={profileImage || userImage} 
              alt="Profile" 
              className="w-full h-full object-cover"
            />
          ) : (
            <Camera className="w-8 h-8 text-gray-400" />
          )}
        </div>
        <label className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 rounded-full cursor-pointer transition-opacity">
          <span className="text-white text-sm">Change Photo</span>
          <input 
            type="file" 
            className="hidden" 
            accept="image/*"
            onChange={onImageChange}
          />
        </label>
      </div>
    </div>
  );
};

export default ProfileImageUpload;