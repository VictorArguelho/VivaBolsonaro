import { loadSave, getSave } from "./gameController.js";

import { loadData, saveData } from "../../../utils/storage.js";
import { setUserData, getUserData } from "../../../server/services/database.js";

import { GAME_SAVE_KEY, GAME_SAVE_COLLECTION } from "../../../consts.js";
import { DocumentNotFoundException } from "../../../server/exceptions/database/databaseExceptions.js";

export function saveGameLocal() {
  saveData(GAME_SAVE_KEY, getSave());
}

export function loadGameLocal() {
  loadSave(loadData(GAME_SAVE_KEY));
}

export async function saveGameCloud() {
  await setUserData(GAME_SAVE_COLLECTION, getSave());
}

export async function loadGameCloud() {
  try {
    loadSave(await getUserData(GAME_SAVE_COLLECTION));
  }
  catch(exception) {
    if(exception instanceof DocumentNotFoundException) {
      loadSave(null)
      return;
    }
    throw exception;
  }
  
}