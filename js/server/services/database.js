import {
  setDoc,
  getDoc,
  getDocs,
  runTransaction as fbRunTransaction,
} from '@firebase/firestore';
import { database, mapServerException } from '@server/firebase.js';
import { DocumentNotFoundException } from '@server/exceptions/database/databaseExceptions.js';
import {
  getDataGeneric,
  setDataGeneric,
  getCollectionGeneric,
} from '@services/databaseGenerics.js';

export async function runTransaction(callback) {
  try {
    return await fbRunTransaction(database, async (t) => {
      return callback({
        getData: (collectionName, id) =>
          getDataGeneric(collectionName, id, (docRef) => t.get(docRef)),

        setData: (collectionName, id, data) =>
          setDataGeneric(collectionName, id, data, (docRef, data) =>
            t.set(docRef, data),
          ),

        getCollectionData: (collectionName, ...constraints) =>
          getCollectionGeneric(
            collectionName,
            (query) => t.get(query),
            ...constraints,
          ),
      });
    });
  } catch (exception) {
    throw mapServerException(exception);
  }
}

export async function getCollectionData(collectionName, ...constraints) {
  try {
    return getCollectionGeneric(collectionName, getDocs, ...constraints);
  } catch (exception) {
    throw mapServerException(exception);
  }
}

export async function getData(collectionName, id) {
  try {
    return getDataGeneric(collectionName, id, getDoc);
  } catch (exception) {
    if (exception instanceof DocumentNotFoundException) {
      throw exception;
    }
    throw mapServerException(exception);
  }
}

export async function setData(collectionName, id, data) {
  try {
    await setDataGeneric(collectionName, id, data, setDoc);
  } catch (exception) {
    throw mapServerException(exception);
  }
}
