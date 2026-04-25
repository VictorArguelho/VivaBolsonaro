import { DocumentNotFoundException } from '@server/exceptions/database/databaseExceptions.js';
import { setUserData, getUserData } from '@services/user.js';
import { isSessionLogged } from '@services/authentication.js';

import { GAME_SAVE_KEY, GAME_SAVE_COLLECTION } from '/js/consts.js';
import { loadData, saveData } from '@utils/storage.js';

import { loadSave, getSave } from '@appGame/gameController.js';

export async function saveGame() {
  const isLogged = await isSessionLogged();

  if (isLogged) {
    await saveGameCloud();
  }
  if (!isLogged) {
    saveGameLocal();
  }
}

export async function loadGame() {
  const isLogged = await isSessionLogged();

  if (isLogged) {
    await loadGameCloud();
  }
  if (!isLogged) {
    loadGameLocal();
  }
}

function saveGameLocal() {
  saveData(GAME_SAVE_KEY, getSave());
}

function loadGameLocal() {
  loadSave(loadData(GAME_SAVE_KEY));
}

async function saveGameCloud() {
  await setUserData(GAME_SAVE_COLLECTION, getSave());
}

async function loadGameCloud() {
  try {
    loadSave(await getUserData(GAME_SAVE_COLLECTION));
  } catch (exception) {
    if (exception instanceof DocumentNotFoundException) {
      loadSave(null);
      return;
    }
    throw exception;
  }
}
