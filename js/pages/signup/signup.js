import { switchPage } from "../../pages.js";
import { signUp as signupAccount } from "../../server/services/authentication.js";

window.addEventListener("DOMContentLoaded", start);

const elements = {
  back: document.getElementById("back-main-page"),
  emailField: document.getElementById("email-field"),
  passwordField: document.getElementById("password-field"),
  signupBtn: document.getElementById("signup-button"),
  messageTxt: document.getElementById("resposta"),
};

function start() {
  elements.back.addEventListener("click", () => {
    switchPage("index");
  });
  elements.signupBtn.addEventListener("click", signup);
}

async function signup() {
  const email = elements.emailField.value;
  const password = elements.passwordField.value;
  try {
    await signupAccount(email, password);
    switchPage("index");
  } catch (exception) {
    elements.messageTxt.textContent = exception.message;
  }
}
