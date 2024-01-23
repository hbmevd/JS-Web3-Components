// src/firebaseConfig.js

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBPIEMcPVaU0Wm8scZeBOhjm0FzriE-L3U",
  authDomain: "gorillabully-c8ea0.firebaseapp.com",
  databaseURL: "https://gorillabully-c8ea0-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "gorillabully-c8ea0",
  storageBucket: "gorillabully-c8ea0.appspot.com",
  messagingSenderId: "131124824990",
  appId: "1:131124824990:web:1d473674a5ea6a1602a48f",
  measurementId: "G-X4NP2L61PC"
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export { firestore }; // Export firestore
