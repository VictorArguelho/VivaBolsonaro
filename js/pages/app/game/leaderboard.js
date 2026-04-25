import { where, orderBy, limit } from '@firebase/firestore';
import { isSessionLogged } from '@services/authentication.js';
import { setData, getCollectionData } from '@services/database.js';
import { getUserData } from '@services/user.js';

import {
  TICK_TIME,
  LEADERBOARD_COLLECTION,
  USER_INFO_COLLECTION,
} from '/js/consts.js';

import { getTotalEarned } from '@appGame/points/points.js';

export async function update() {
  const isLogged = await isSessionLogged();
  if (!isLogged) {
    return;
  }

  const userInfo = await getUserData(USER_INFO_COLLECTION);
  setData(LEADERBOARD_COLLECTION, userInfo.username, {
    points: getTotalEarned(),
  });
}

export async function getTop() {
  return getCollectionData(
    LEADERBOARD_COLLECTION,
    orderBy('points', 'desc'),
    limit(10),
  );
}
