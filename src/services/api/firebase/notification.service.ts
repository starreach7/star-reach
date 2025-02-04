import { getMessaging, getToken } from 'firebase/messaging';
import { app } from '../../../config/firebase';

class NotificationService {
  private messaging = getMessaging(app);

  async getFCMToken(): Promise<string | null> {
    try {
      // First check if service worker is supported
      if (!('serviceWorker' in navigator)) {
        console.log('Service workers are not supported');
        return null;
      }

      // Register service worker
      const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js');
      await navigator.serviceWorker.ready;

      // Request notification permission
      const permission = await this.requestNotificationPermission();
      if (!permission) {
        console.log('Notification permission denied');
        return null;
      }

      // Get registration token
      const currentToken = await getToken(this.messaging, {
        vapidKey: 'BC_ZmVC6oE-6UGuk7NgDQ75odDuEp_OxLUmPc1j2_elZ1-cZGo-ZSwAhMb2sto3k0TLYfTyChTmP8HqSk-0Wnig',
        serviceWorkerRegistration: registration
      });

      if (currentToken) {
        console.log('FCM token:', currentToken);
        return currentToken;
      } else {
        console.log('No registration token available.');
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