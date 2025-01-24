import React from 'react';
import { Bell } from 'lucide-react';
import NotificationsPopover from './NotificationPopover';

interface NotificationButtonProps {
  showNotifications: boolean;
  setShowNotifications: (show: boolean) => void;
  notifications: Array<{
    id: number;
    title: string;
    message: string;
    time: string;
    read: boolean;
  }>;
  className?: string;
  isMobile?: boolean;
}

const NotificationButton: React.FC<NotificationButtonProps> = ({
  showNotifications,
  setShowNotifications,
  notifications,
  className = "",
  isMobile = false
}) => {
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setShowNotifications(!showNotifications)}
        className="p-2 text-gray-300 hover:text-emerald-400 rounded-full hover:bg-gray-800/50 transition-all duration-200"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-emerald-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>
      <NotificationsPopover
        notifications={notifications}
        isOpen={showNotifications}
        onClose={() => setShowNotifications(false)}
        isMobile={isMobile}
      />
    </div>
  );
};

export default NotificationButton;