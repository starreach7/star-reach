import { io, Socket } from 'socket.io-client';
import { useNotificationStore } from '../../store/notificationStore';
import api from './axios';

class SocketService {
  private socket: Socket | null = null;
  private initialized = false;

  async initialize(userId: string) {
    if (this.initialized) return;

    try {
      // Fetch initial notifications
    //   const response = await api.get('/user/notifications');
    //   const { addNotification, setInitialNotifications } = useNotificationStore.getState();
    //   setInitialNotifications(response.data.data);

      // Initialize socket connection
      this.socket = io(import.meta.env.VITE_SOCKET_URL || 'https://starreach.onrender.com', {
        auth: {
          userId
        },
        transports: ['websocket']
      });

      this.setupEventListeners();
      this.initialized = true;
    } catch (error) {
      console.error('Failed to initialize notifications:', error);
    }
  }

  private setupEventListeners() {
    debugger;
    if (!this.socket) return;

    // Connection events
    this.socket.on('connect', () => {
      console.log('Connected to socket server');
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from socket server');
    });

    // Notification events
    this.socket.on('notification', (notification) => {
        console.log(notification);
      const { addNotification } = useNotificationStore.getState();
      addNotification(notification);
    });

    this.socket.on('notification_read', (notificationId) => {
      const { markNotificationAsRead } = useNotificationStore.getState();
      markNotificationAsRead(notificationId);
    });

    this.socket.on('notifications_clear', () => {
      const { clearNotifications } = useNotificationStore.getState();
      clearNotifications();
    });
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.initialized = false;
    }
  }

  // Mark a notification as read
  async markNotificationAsRead(notificationId: string) {
    try {
      await api.put(`/user/notifications/${notificationId}/read`);
      const { markNotificationAsRead } = useNotificationStore.getState();
      markNotificationAsRead(notificationId);
    } catch (error) {
      console.error('Failed to mark notification as read:', error);
    }
  }

  // Mark all notifications as read
  async markAllNotificationsAsRead() {
    try {
      await api.put('/user/notifications/read-all');
      const { markAllAsRead } = useNotificationStore.getState();
      markAllAsRead();
    } catch (error) {
      console.error('Failed to mark all notifications as read:', error);
    }
  }
}

export default new SocketService();