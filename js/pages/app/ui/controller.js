import {
  start as headerStart,
  update as headerUpdate,
} from '@appUI/header/controller.js';

import {
  start as clickStart,
  update as clickUpdate,
} from '@appUI/click/controller.js';

import {
  start as shopStart,
  update as shopUpdate,
} from '@appUI/shop/controller.js';

export async function start() {
  await headerStart();
  clickStart();
  shopStart();
}

export async function update() {
  await headerUpdate();
  clickUpdate();
  shopUpdate();
}
