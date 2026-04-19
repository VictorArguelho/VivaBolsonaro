import { AuthException } from "./AuthException.js";

export class EmailAlreadyInUseException extends AuthException {
  constructor() {
    super("Email já está em uso", "EMAIL_ALREADY_IN_USE");
  }
}

export class InvalidEmailException extends AuthException {
  constructor() {
    super("Email invalido", "INVALID_EMAIL");
  }
}

export class WeakPasswordException extends AuthException {
  constructor() {
    super("Senha muito fraca", "WEAK_PASSWORD");
  }
}

export class InvalidCredentialsException extends AuthException {
  constructor() {
    super("Senha/Email invalidos", "INVALID_CREDENTIALS");
  }
}