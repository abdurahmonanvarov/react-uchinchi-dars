import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDOUat_rsG80I38hAwtM5Ljrw7fKgeb1VU",
  authDomain: "solo-manager-fd808.firebaseapp.com",
  projectId: "solo-manager-fd808",
  storageBucket: "solo-manager-fd808.firebasestorage.app",
  messagingSenderId: "844602556578",
  appId: "1:844602556578:web:1e4f031e14dffffd5fd7fb",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();
