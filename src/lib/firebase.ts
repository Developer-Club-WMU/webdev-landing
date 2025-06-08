import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCCkDoi91M-eXuS30M8gKeg73lq1um6htw",
  authDomain: "devclub-events-cff77.firebaseapp.com",
  projectId: "devclub-events-cff77",
  storageBucket: "devclub-events-cff77.firebasestorage.app",
  messagingSenderId: "250950861411",
  appId: "1:250950861411:web:3b21980bbb5d44749eee56",
  measurementId: "G-Q0RZ4632RH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Initialize and export Firestore
export const db = getFirestore(app);

// Optional: export analytics if you're using it
export const analytics = getAnalytics(app);
