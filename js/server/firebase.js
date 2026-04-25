import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js';

import {
  OperationNotAllowedException,
  NetworkRequestFailedException,
  TooManyRequestsException,
  InternalErrorException,
  UnknownErrorException,
} from './exceptions/server/serverExceptions.js';

const firebaseConfig = {
  apiKey: "AIzaSyCviMpicnGpYcV2cpe7zp8UmxceNIkjda4",
  authDomain: "vivabolsonaro-a3b22.firebaseapp.com",
  projectId: "vivabolsonaro-a3b22",
  storageBucket: "vivabolsonaro-a3b22.firebasestorage.app",
  messagingSenderId: "934764129118",
  appId: "1:934764129118:web:6f1043c1f99356d6dfbdcf"
};

const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app);
export const database = getFirestore(app);

export function mapServerException(exception) {
  const code = exception?.code;

  switch (code) {
    case 'auth/operation-not-allowed':
      return new OperationNotAllowedException();
    case 'auth/network-request-failed':
      return new NetworkRequestFailedException();
    case 'auth/too-many-requests':
      return new TooManyRequestsException();
    case 'auth/internal-error':
      return new InternalErrorException();

    default:
      return new UnknownErrorException();
  }
}
