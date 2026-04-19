import { isLogged } from "../app.js";
import { headerElements } from "./uiElements.js";

export function start() {
  if (isLogged) {
    headerElements.notLogged.remove();
  }
  if (!isLogged) {
    headerElements.logged.remove();
  }
}
