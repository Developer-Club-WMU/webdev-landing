import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';
//import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCCkDoi91M-eXuS30M8gKeg73lq1um6htw",
  authDomain: "devclub-events-cff77.firebaseapp.com",
  projectId: "devclub-events-cff77",
  storageBucket: "devclub-events-cff77.firebasestorage.app",
  messagingSenderId: "250950861411",
  appId: "1:250950861411:web:3b21980bbb5d44749eee56",
  measurementId: "G-Q0RZ4632RH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize and export Firestore
export const fdb = getFirestore(app);

// Export analytics function that only initializes in browser
export const getAnalyticsInstance = () => {
  if (typeof window !== 'undefined') {
    return getAnalytics(app);
  }
  return null;
};

// Export auth and Google provider for authentication flows
//export const auth = getAuth(app);
//export const googleProvider = new GoogleAuthProvider();
