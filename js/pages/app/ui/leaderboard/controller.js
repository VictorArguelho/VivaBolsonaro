import { render } from '@appUI/leaderboard/render.js';
import { Timer } from '@utils/objects/timer.js';

const renderTimer = new Timer(5000);

export async function update() {
  renderTimer.update();

  if (renderTimer.isReady()) {
    await render();
  }
}
