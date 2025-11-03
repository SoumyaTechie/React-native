// firebaseConfig.ts
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyB2n2eGdadTVBpez2J_JSrptcu0P3qtVkg",
  authDomain: "react-http-dedb9.firebaseapp.com",
  projectId: "react-http-dedb9",
  storageBucket: "react-http-dedb9.firebasestorage.app",
  messagingSenderId: "1062035059821",
  appId: "1:1062035059821:android:ae4265cbbd7d2a29443b64",
};

// Initialize once
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// Get Firestore instance (modular way)
export const db = getFirestore(app);
