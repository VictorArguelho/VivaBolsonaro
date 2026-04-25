import { signUp } from '@services/authentication.js';
import { USER_INFO_COLLECTION } from '/js/consts.js';
import { UsernameAlreadyTakedException } from '@signupPage/exceptions/usernameAlreadyTakedException.js';
import { runTransaction } from '@services/database.js';
import { deleteUser } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js';
import { mapServerException } from '@server/firebase.js';
import { getUserUid } from '@services/user.js';
import { DocumentNotFoundException } from '@server/exceptions/database/databaseExceptions.js';
import { getCollectionData, setData } from '../../server/services/database.js';
import { where } from '@firebase/firestore';
import { authentication } from '../../server/firebase.js';
import { UnknownErrorException } from '../../server/exceptions/server/serverExceptions.js';
import { mapAuthenticationException } from '../../server/services/authentication.js';
import { AuthenticationException } from '../../server/exceptions/authentication/authenticationException.js';
import { DatabaseException } from '../../server/exceptions/database/databaseException.js';

export async function createAccount(email, password, username) {
  try {
    const exists = await getCollectionData(
      USER_INFO_COLLECTION,
      where('username', '==', username),
    );

    if (exists.length > 0) {
      throw new UsernameAlreadyTakedException('Nome de usuario já cadastrado');
    }

    const userCredential = await signUp(email, password);
    const uid = await getUserUid();

    await setData(USER_INFO_COLLECTION, uid, {
      email,
      username,
      password,
    });
  } catch (exception) {
    if (
      exception instanceof UsernameAlreadyTakedException ||
      exception instanceof AuthenticationException ||
      exception instanceof DatabaseException
    ) {
      throw exception;
    }

    const credentialException = mapAuthenticationException(exception);
    const serverException = mapServerException(exception);

    console.log(exception.message);
    console.log(credentialException.message);

    if (!(credentialException instanceof UnknownErrorException)) {
      throw credentialException;
    }

    if (!(serverException instanceof UnknownErrorException)) {
      throw serverException;
    }

    try {
      await deleteUser(authentication.currentUser);
    } catch (deleteException) {
      throw mapServerException(deleteException);
    }
  }
}

export async function createAccounta(email, password, username) {
  try {
    const userCredential = await signUp(email, password);
    const uid = userCredential.user.uid;

    await runTransaction(async (db) => {
      const existing = await db
        .getData(USERNAMES_COLLECTION, username)
        .catch(() => null);

      if (existing) {
        throw new UsernameAlreadyTakedException(
          'Nome de usuário já cadastrado',
        );
      }

      db.setData(USERNAMES_COLLECTION, username, { uid });

      db.setData(USER_INFO_COLLECTION, uid, {
        email,
        username,
        password,
      });
    });
  } catch (exception) {
    throw exception;
    if (exception instanceof UsernameAlreadyTakedException) {
      throw exception;
    }

    try {
      await deleteUser(userCredential.user);
    } catch (error) {
      throw mapServerException(error);
    }
  }
}
