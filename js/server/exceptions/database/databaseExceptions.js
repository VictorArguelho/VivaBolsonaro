import { DatabaseException } from './databaseException.js';

export class UserNotAuthenticatedException extends DatabaseException {
  constructor() {
    super('Usuario não autenticado', 'USER_NOT_AUTHENTICATED');
  }
}

export class DocumentNotFoundException extends DatabaseException {
  constructor() {
    super('Documento nao encontrado', 'DOCUMENT_NOT_FOUND');
  }
}
