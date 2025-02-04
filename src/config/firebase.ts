import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getMessaging, onMessage } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: "AIzaSyBnuGzzPBC07axqtfTiS1Bf1iOsn3ezSKY",
  authDomain: "starreach-b52c3.firebaseapp.com",
  projectId: "starreach-b52c3",
  storageBucket: "starreach-b52c3.firebasestorage.app",
  messagingSenderId: "469750062685",
  appId: "1:469750062685:web:beb7d3b956f6b3499437b4",
  measurementId: "G-RC2TJ4HTFF"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);

// Initialize Firebase Cloud Messaging
export const messaging = getMessaging(app);

// Handle incoming messages while the app is in the foreground
onMessage(messaging, (payload) => {
  console.log('Message received:', payload);
  // You can show a notification here using the Notification API
  if (Notification.permission === 'granted') {
    new Notification(payload.notification?.title || 'New Message', {
      body: payload.notification?.body,
      icon: '/vite.svg'
    });
  }
});