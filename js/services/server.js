import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
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
export const auth = getAuth(app);
export const db = getFirestore(app);

export async function signUp(email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );

    return userCredential.user;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function login(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    return userCredential.user;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export function getUser() {
  return auth.currentUser;
}