import { loadSave } from '@appGame/gameController.js';
import { saveGame } from '@appGame/saves.js';
import { rebirth } from './pages/app/game/points/points';

window.porra = {
  resetSave,
  saveGame,
};

function resetSave() {
  loadSave(null);
}
