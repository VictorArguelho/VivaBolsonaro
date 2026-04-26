import { render } from '@appUI/leaderboard/render.js';
import { Timer } from '@utils/objects/timer.js';

const renderTimer = new Timer(30000);

export async function start() {
  await render();
}

export async function update(deltaTime) {
  renderTimer.update(deltaTime);

  if (renderTimer.isReady()) {
    await render();
  }
}
