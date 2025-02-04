import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

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