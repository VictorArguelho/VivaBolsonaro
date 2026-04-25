import { database, mapServerException } from '@server/firebase.js';
import { isSessionLogged, getSession } from '@services/authentication.js';
import { getDataGeneric, setDataGeneric } from '@services/databaseGenerics.js';
import {
  getData,
  setData,
  runTransaction as dbRunTransaction,
} from '@services/database.js';

export async function getUserUid() {
  if (!(await isSessionLogged())) {
    throw new UserNotAuthenticatedException();
  }
  const user = await getSession();
  return user.uid;
}

export async function runUserTransaction(callback) {
  const userUid = await getUserUid();

  return dbRunTransaction((db) => {
    return callback({
      ...db,
      getUserData: (collection) => db.getData(collection, userUid),
      setUserData: (collection, data) => db.setData(collection, userUid, data),
    });
  });
}

export async function getUserData(collectionName) {
  const userUid = await getUserUid();
  return getData(collectionName, userUid);
}

export async function setUserData(collection, data) {
  const userUid = await getUserUid();
  await setData(collection, userUid, data);
}
