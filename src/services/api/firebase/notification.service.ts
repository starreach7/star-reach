import { getMessaging, getToken } from 'firebase/messaging';
import { app } from '../../../config/firebase';

class NotificationService {
  private messaging = getMessaging(app);

  async getFCMToken(): Promise<string | null> {
    try {
      // First request notification permission
      const permission = await this.requestNotificationPermission();
      if (!permission) {
        console.log('Notification permission denied');
        return null;
      }

      // Get registration token
      const currentToken = await getToken(this.messaging, {
        vapidKey: 'BC_ZmVC6oE-6UGuk7NgDQ75odDuEp_OxLUmPc1j2_elZ1-cZGo-ZSwAhMb2sto3k0TLYfTyChTmP8HqSk-0Wnig' // Replace with your VAPID key from Firebase console
});

      if (currentToken) {
        console.log('FCM token:', currentToken);
        return currentToken;
      } else {
        console.log('No registration token available. Request permission to generate one.');
        return null;
      }
    } catch (err) {
      console.error('An error occurred while retrieving token:', err);
      return null;
    }
  }

  async requestNotificationPermission(): Promise<boolean> {
    try {
      if (!('Notification' in window)) {
        console.log('This browser does not support notifications');
        return false;
      }

      const permission = await Notification.requestPermission();
      return permission === 'granted';
    } catch (err) {
      console.error('Error requesting notification permission:', err);
      return false;
    }
  }
}

export default new NotificationService();