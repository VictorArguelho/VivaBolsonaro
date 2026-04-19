import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCyQfEk65yPoQ7jZPOnXv5P3Vx9EqMOo9U",
  authDomain: "vivabolsonaro-b0fa6.firebaseapp.com",
  projectId: "vivabolsonaro-b0fa6",
  storageBucket: "vivabolsonaro-b0fa6.firebasestorage.app",
  messagingSenderId: "1025946188962",
  appId: "1:1025946188962:web:50f919dc065caa186e2bfb",
};

const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app);
export const dataBase = getFirestore(app);