import {
  doc,
  setDoc,
  getDoc,
} from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js';
import { database, mapServerException } from '@server/firebase.js';
import { isSessionLogged, getSession } from '@services/authentication.js';
import {
  UserNotAuthenticatedException,
  DocumentNotFoundException,
} from '@server/exceptions/database/databaseExceptions.js';

export async function setUserData(collection, data) {
  const docRef = await getDocumentRef(collection);

  try {
    await setDoc(docRef, data);
  } catch (exception) {
    throw mapServerException(exception);
  }
}

export async function getUserData(collection) {
  const docRef = await getDocumentRef(collection);

  try {
    const data = await getDoc(docRef);

    if (data.exists()) {
      return data.data();
    } else {
      throw new DocumentNotFoundException();
    }
  } catch (exception) {
    if (exception instanceof DocumentNotFoundException) {
      throw exception;
    }

    throw mapServerException(exception);
  }
}

async function getDocumentRef(collection) {
  if (!(await isSessionLogged())) {
    throw new UserNotAuthenticatedException();
  }

  const user = await getSession();
  return doc(database, collection, user.uid);
}
