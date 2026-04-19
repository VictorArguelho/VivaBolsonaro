import { loadSave, getSave } from "./gameController.js";

import { loadData, saveData } from "../utils/storage.js";
import { setUserData, getUserData } from "../server/services/database.js";

import { GAME_SAVE_KEY, GAME_SAVE_COLLECTION } from "../consts.js";

export function saveGameLocal() {
  saveData(GAME_SAVE_KEY, getSave());
}

export function loadGameLocal() {
  loadSave(loadData(GAME_SAVE_KEY));
}

export function saveGameCloud() {
  setUserData(GAME_SAVE_COLLECTION, getSave());
}

export function loadGameCloud() {
  loadSave(getUserData(GAME_SAVE_COLLECTION));
}