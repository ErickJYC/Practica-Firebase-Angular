
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC41NDXZP7pNuO6V1OXid01Vf-w_1bHXgI",
  authDomain: "practica-firebase-ups.firebaseapp.com",
  projectId: "practica-firebase-ups",
  storageBucket: "practica-firebase-ups.firebasestorage.app",
  messagingSenderId: "630825833005",
  appId: "1:630825833005:web:63ab2a84a03a2f74755ea4",
  measurementId: "G-P6WXNPJFES"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = getAuth(app);
