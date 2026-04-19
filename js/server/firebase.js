import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

import {
  OperationNotAllowedException,
  NetworkRequestFailedException,
  TooManyRequestsException,
  InternalErrorException,
  UnknownErrorException,
} from "./exceptions/server/serverExceptions.js";

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
export const database = getFirestore(app);

export function mapServerException(exception) {
  const code = exception?.code;

  switch (code) {
    case "auth/operation-not-allowed":
      return new OperationNotAllowedException();
    case "auth/network-request-failed":
      return new NetworkRequestFailedException();
    case "auth/too-many-requests":
      return new TooManyRequestsException();
    case "auth/internal-error":
      return new InternalErrorException();

    default:
      return new UnknownErrorException();
  }
}