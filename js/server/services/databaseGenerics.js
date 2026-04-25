import { doc, collection as col, query as getQuery } from '@firebase/firestore';
import { database } from '@server/firebase.js';
import { DocumentNotFoundException } from '@server/exceptions/database/databaseExceptions.js';

export async function getDataGeneric(collectionName, id, getOperation) {
  console.log('leitura feita'); //debug

  const docRef = getDocRef(collectionName, id);
  const snapshot = await getOperation(docRef);

  if (snapshot.exists()) {
    return snapshot.data();
  } else {
    throw new DocumentNotFoundException();
  }
}

export async function getCollectionGeneric(
  collectionName,
  queryOperation,
  ...constraints
) {
  console.log('leitura coleção feita'); //debug

  const colRef = col(database, collectionName);

  const query =
    constraints.length > 0 ? getQuery(colRef, ...constraints) : colRef;

  const snapshot = await queryOperation(query);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

export async function setDataGeneric(collectionName, id, data, setOperation) {
  console.log('escrita feita'); //debug

  const docRef = getDocRef(collectionName, id);
  await setOperation(docRef, data);
}

function getDocRef(colName, id) {
  return doc(database, colName, id);
}
