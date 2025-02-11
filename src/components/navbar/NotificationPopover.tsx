import React from 'react';
import { Bell, X } from 'lucide-react';
import { useNotificationStore } from '../../store/notificationStore';
import { formatDistanceToNow } from 'date-fns';
import socketService from '../../services/api/socket.service';
import { useNavigate } from 'react-router-dom';

interface NotificationsPopoverProps {
  isOpen: boolean;
  onClose: () => void;
  isMobile?: boolean;
}

const NotificationsPopover: React.FC<NotificationsPopoverProps> = ({
  isOpen,
  onClose,
  isMobile = false
}) => {
  const { notifications, markAllAsRead } = useNotificationStore();
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleMarkAllAsRead = () => {
    socketService.markAllNotificationsAsRead();
  };

  const handleNotificationClick = (notificationId: string, deepLink: boolean) => {
    socketService.markNotificationAsRead(notificationId);
    if (deepLink) {
      navigate(`/notification/${notificationId}`);
      onClose();
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isMobile && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={onClose}
        />
      )}
      
      {/* Notification Container */}
      <div 
        className={`
          ${isMobile ? 'fixed inset-x-0 mx-4 top-20' : 'absolute right-0 w-96'}
          bg-gray-800 rounded-xl shadow-2xl ring-1 ring-gray-700 z-50
          flex flex-col
          ${isMobile ? 'h-[calc(100vh-6rem)]' : 'max-h-[32rem]'}
        `}
      >
        {/* Header - Fixed */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700 bg-gray-800">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-emerald-400" />
            <h3 className="text-lg font-semibold text-white">Notifications</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-gray-400 hover:text-gray-300 hover:bg-gray-700/50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full px-4 py-8">
              <Bell className="w-12 h-12 text-gray-500 mb-3" />
              <p className="text-gray-400 text-center">No new notifications</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-700">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  onClick={() => handleNotificationClick(notification.id, notification.deepLink)}
                  className={`
                    px-4 py-4 hover:bg-gray-700/50 transition-colors cursor-pointer
                    ${!notification.isRead ? 'bg-gray-700/20' : ''}
                  `}
                >
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <h4 className="text-sm font-medium text-white mb-1">
                        {notification.title}
                      </h4>
                      <p className="text-sm text-gray-400 line-clamp-2 mb-2">
                        {notification.description}
                      </p>
                      <span className="text-xs text-gray-500">
                        {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
                      </span>
                    </div>
                    {!notification.isRead && (
                      <div className="w-2 h-2 bg-emerald-500 rounded-full flex-shrink-0 mt-1" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer - Fixed */}
        {notifications.length > 0 && (
          <div className="px-4 py-3 border-t border-gray-700 bg-gray-800">
            <button 
              onClick={handleMarkAllAsRead}
              className="text-sm font-medium text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              Mark all as read
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default NotificationsPopover;