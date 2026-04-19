import { AuthException } from "./AuthException.js";

export class OperationNotAllowedException extends AuthException {
  constructor() {
    super("Operação não permitida", "OPERATION_NOT_ALLOWED");
  }
}

export class NetworkRequestFailedException extends AuthException {
  constructor() {
    super("Falha na conexão", "NETWORK_REQUEST_FAILED");
  }
}

export class TooManyRequestsException extends AuthException {
  constructor() {
    super("Tentativas excessivas", "TOO_MANY_REQUESTS");
  }
}

export class InternalErrorException extends AuthException {
  constructor() {
    super("Erro interno", "INTERNAL_ERROR");
  }
}

export class UnknownErrorException extends AuthException {
  constructor() {
    super("Erro desconhecido", "UNKNOWN_ERROR");
  }
}