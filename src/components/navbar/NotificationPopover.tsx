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

  const mobileStyles = isMobile ? 'fixed inset-x-0 top-20 mx-4' : 'absolute right-0';
  const maxHeightStyle = isMobile ? 'max-h-[60vh]' : 'max-h-[80vh]';
  const widthStyle = isMobile ? 'w-100' : 'w-96';

  return (
    <>
      {isMobile && (
        <div 
          className="fixed inset-0 bg-black/50 z-40"
          onClick={onClose}
        />
      )}
      
      <div className={`${mobileStyles} ${widthStyle} bg-gray-800 rounded-xl shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none z-50 overflow-hidden ${maxHeightStyle}`}>
        <div className="flex flex-col h-full">
          <div className="px-4 py-3 border-b border-gray-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Bell className="w-5 h-5 text-emerald-400" />
                <h3 className="text-lg font-semibold text-white">Notifications</h3>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 text-gray-400 hover:text-gray-300 hover:bg-gray-700/50 rounded-full transition-all duration-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="px-4 py-8 text-center text-gray-400">
                <Bell className="w-8 h-8 mx-auto mb-3 opacity-50" />
                <p>No new notifications</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-700">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    onClick={() => handleNotificationClick(notification.id, notification.deepLink)}
                    className={`px-4 py-3 hover:bg-gray-700/50 transition-colors cursor-pointer ${
                      !notification.isRead ? 'bg-gray-700/20' : ''
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1 min-w-0 mr-4">
                        <h4 className="text-sm font-medium text-white mb-1">{notification.title}</h4>
                        <p className="text-sm text-gray-400 line-clamp-2">{notification.description}</p>
                        <span className="text-xs text-gray-500 mt-1 block">
                          {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
                        </span>
                      </div>
                      {!notification.isRead && (
                        <div className="w-2 h-2 bg-emerald-500 rounded-full mt-1.5 flex-shrink-0" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {notifications.length > 0 && (
            <div className="px-4 py-3 border-t border-gray-700 bg-gray-800/95 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <button 
                  onClick={handleMarkAllAsRead}
                  className="text-emerald-400 hover:text-emerald-300 text-sm font-medium transition-colors"
                >
                  Mark all as read
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default NotificationsPopover;