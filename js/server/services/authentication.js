import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js';

import {
  EmailAlreadyInUseException,
  InvalidEmailException,
  WeakPasswordException,
  InvalidCredentialsException,
} from '@server/exceptions/authentication/authenticationExceptions.js';

import { UnknownErrorException } from '@server/exceptions/server/serverExceptions.js';

import { authentication, mapServerException } from '@server/firebase.js';

export async function signUp(email, password) {
  return await executeAuthenticationOperation(
    createUserWithEmailAndPassword,
    email,
    password,
  );
}

export async function login(email, password) {
  return await executeAuthenticationOperation(
    signInWithEmailAndPassword,
    email,
    password,
  );
}

export async function logout() {
  try {
    await signOut(authentication);
  } catch (error) {
    mapAuthenticationException(error);
  }
}

export async function isSessionLogged() {
  const user = await getSession();
  return !!user;
}

export async function getSession() {
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(authentication, (user) => {
      unsubscribe();
      resolve(user);
    });
  });
}

async function executeAuthenticationOperation(operation, email, password) {
  try {
    const userCredential = await operation(authentication, email, password);

    return userCredential.user;
  } catch (exception) {
    throw mapAuthenticationException(exception);
  }
}

export function mapAuthenticationException(exception) {
  const code = exception?.code;
  const serverException = mapServerException(exception);

  if (!(serverException instanceof UnknownErrorException)) {
    return serverException;
  }

  switch (code) {
    case 'auth/email-already-in-use':
      return new EmailAlreadyInUseException();
    case 'auth/invalid-email':
      return new InvalidEmailException();
    case 'auth/weak-password':
      return new WeakPasswordException();

    case 'auth/invalid-credential':
      return new InvalidCredentialsException();
    case 'auth/user-not-found':
      return new InvalidCredentialsException();
    case 'auth/wrong-password':
      return new InvalidCredentialsException();

    default:
      return new UnknownErrorException();
  }
}
