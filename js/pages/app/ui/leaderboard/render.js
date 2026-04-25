import { elements } from '@appUI/leaderboard/elements.js';
import { getTop } from '@appGame/leaderboard.js';
import { formatNumber } from '@utils/formatNumber.js';

export async function render() {
  const top = await getTop();
  let topItems = '';
  for (let i = 0; i < top.length; i++) {
    const rankData = top[i];
    topItems += getRankHTML(rankData.id, rankData.points);
  }
  elements.leaderboard.innerHTML = getTitleHTML();
  elements.leaderboard.innerHTML += getListHTML(topItems);
}

function getTitleHTML() {
  return `
    <h1 class="leaderboard-title title">
      Placar Global
    </h1>
  `;
}

function getListHTML(items) {
  return `
    <ol class="leaderboard-list">
      ${items}
    </ol>
  `;
}

function getRankHTML(username, points) {
  const pointsFormated = formatNumber(points, 2);
  return `
    <li class="leaderboard-rank text">
      <span class="emphasis">
        ${username} 
      </span>
      ajudou o Bolsonaro
      <span class="emphasis">
        ${pointsFormated} 
      </span> 
      vezes
    </li>
  `;
}
