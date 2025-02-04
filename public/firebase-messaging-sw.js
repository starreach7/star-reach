// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
firebase.initializeApp({
  apiKey: "AIzaSyBnuGzzPBC07axqtfTiS1Bf1iOsn3ezSKY",
  authDomain: "starreach-b52c3.firebaseapp.com",
  projectId: "starreach-b52c3",
  storageBucket: "starreach-b52c3.firebasestorage.app",
  messagingSenderId: "469750062685",
  appId: "1:469750062685:web:beb7d3b956f6b3499437b4",
  measurementId: "G-RC2TJ4HTFF"
});

// Retrieve an instance of Firebase Messaging so that it can handle background messages.
const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage((payload) => {
  console.log('Received background message:', payload);

  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/vite.svg',
    badge: '/vite.svg'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});