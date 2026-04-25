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
  apiKey: 'AIzaSyD93TIXWOcq6BkqOUSny0eZ6E8SMuzNN4c',
  authDomain: 'vivabolsonaro-6b39d.firebaseapp.com',
  projectId: 'vivabolsonaro-6b39d',
  storageBucket: 'vivabolsonaro-6b39d.firebasestorage.app',
  messagingSenderId: '632581779747',
  appId: '1:632581779747:web:7d86443e4f319d81f39c96',
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
