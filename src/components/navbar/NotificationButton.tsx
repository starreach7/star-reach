import React from 'react';
import { Bell } from 'lucide-react';
import NotificationsPopover from './NotificationPopover';
import { useNotificationStore } from '../../store/notificationStore';

interface NotificationButtonProps {
  showNotifications: boolean;
  setShowNotifications: (show: boolean) => void;
  className?: string;
  isMobile?: boolean;
}

const NotificationButton: React.FC<NotificationButtonProps> = ({
  showNotifications,
  setShowNotifications,
  className = "",
  isMobile = false
}) => {
  const { unreadCount } = useNotificationStore();

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setShowNotifications(!showNotifications)}
        className="p-2 text-gray-300 hover:text-emerald-400 rounded-full hover:bg-gray-800/50 transition-all duration-200"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-emerald-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
      </button>
      <NotificationsPopover
        isOpen={showNotifications}
        onClose={() => setShowNotifications(false)}
        isMobile={isMobile}
      />
    </div>
  );
};

export default NotificationButton;