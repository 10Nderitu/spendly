// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCL0iWnmBNqndDkLGXe-ij1L40jQGuzkCo",
  authDomain: "expense-tracker-bbbf7.firebaseapp.com",
  projectId: "expense-tracker-bbbf7",
  storageBucket: "expense-tracker-bbbf7.firebasestorage.app",
  messagingSenderId: "503316366787",
  appId: "1:503316366787:web:367bd325c0acf7f68ae976",
  measurementId: "G-ZNH7V5CPTE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);