import { ServerException } from "./serverException.js";

export class OperationNotAllowedException extends ServerException {
  constructor() {
    super("Operação não permitida", "OPERATION_NOT_ALLOWED");
  }
}

export class NetworkRequestFailedException extends ServerException {
  constructor() {
    super("Falha na conexão", "NETWORK_REQUEST_FAILED");
  }
}

export class TooManyRequestsException extends ServerException {
  constructor() {
    super("Tentativas excessivas", "TOO_MANY_REQUESTS");
  }
}

export class InternalErrorException extends ServerException {
  constructor() {
    super("Erro interno", "INTERNAL_ERROR");
  }
}

export class UnknownErrorException extends ServerException {
  constructor() {
    super("Erro desconhecido", "UNKNOWN_ERROR");
  }
}