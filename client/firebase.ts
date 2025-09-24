// client/firebase.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBpoYnH1OqLm6bKw_3eCPMarCOhX0Wct3I",
  authDomain: "logosgn-f07e8.firebaseapp.com",
  projectId: "logosgn-f07e8",
  storageBucket: "logosgn-f07e8.firebasestorage.app",
  messagingSenderId: "503076513710",
  appId: "1:503076513710:web:4ce8fb9847724e981eca3f",
  measurementId: "G-DMBEEQS2FG",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);
