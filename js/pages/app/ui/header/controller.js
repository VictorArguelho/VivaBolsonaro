import { isSessionLogged } from '@services/authentication.js';
import { refresh } from '@appUI/header/elements.js';
import { render } from '@appUI/header/render.js';
import { setup } from '@appUI/header/setupEvents.js';

let lastIsLogged = null;

export async function start() {
  lastIsLogged = await isSessionLogged();
  await render();
  await refresh();
  await setup();
}

export async function update(deltaTime) {
  const isLogged = await isSessionLogged();
  if (isLogged === lastIsLogged) {
    return;
  }
  lastIsLogged = isLogged;

  await render();
  await refresh();
  await setup();
}
