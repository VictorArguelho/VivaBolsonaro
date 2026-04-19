import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { authentication } from "./firebase.js";

import {
  EmailAlreadyInUseException,
  InvalidEmailException,
  WeakPasswordException,
  InvalidCredentialsException,
} from "./exceptions/authentication/userExceptions.js";

import {
  OperationNotAllowedException,
  NetworkRequestFailedException,
  TooManyRequestsException,
  InternalErrorException,
  UnknownErrorException,
} from "./exceptions/authentication/serverExceptions.js";

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
    throwAuthenticationException(error);
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
    throwAuthenticationException(exception);
  }
}

function throwAuthenticationException(exception) {
  const code = exception?.code;

  switch (code) {
    case "auth/email-already-in-use":
      throw new EmailAlreadyInUseException();
    case "auth/invalid-email":
      throw new InvalidEmailException();
    case "auth/weak-password":
      throw new WeakPasswordException();

    case "auth/invalid-credential":
      throw new InvalidCredentialsException();
    case "auth/user-not-found":
      throw new InvalidCredentialsException();
    case "auth/wrong-password":
      throw new InvalidCredentialsException();

    case "auth/operation-not-allowed":
      throw new OperationNotAllowedException();
    case "auth/network-request-failed":
      throw new NetworkRequestFailedException();
    case "auth/too-many-requests":
      throw new TooManyRequestsException();
    case "auth/internal-error":
      throw new InternalErrorException();

    default:
      throw new UnknownErrorException();
  }
}