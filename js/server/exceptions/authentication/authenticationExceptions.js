import { AuthenticationException } from "./authenticationException.js";

export class EmailAlreadyInUseException extends AuthenticationException {
  constructor() {
    super("Email já está em uso", "EMAIL_ALREADY_IN_USE");
  }
}

export class InvalidEmailException extends AuthenticationException {
  constructor() {
    super("Email invalido", "INVALID_EMAIL");
  }
}

export class WeakPasswordException extends AuthenticationException {
  constructor() {
    super("Senha muito fraca", "WEAK_PASSWORD");
  }
}

export class InvalidCredentialsException extends AuthenticationException {
  constructor() {
    super("Senha/Email invalidos", "INVALID_CREDENTIALS");
  }
}