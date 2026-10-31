// UniFind-UCC - REAL CONFIG - FINAL
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-storage.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyA80kyQ6WamIeJ9M9-ycfjlGVSC6_KMLM1Q",
  authDomain: "unifind-ucc.firebaseapp.com",
  projectId: "unifind-ucc",
  storageBucket: "unifind-ucc.firebasestorage.app",
  messagingSenderId: "741083895005",
  appId: "1:741083895005:web:5598c8f39eea0d690ff734"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);