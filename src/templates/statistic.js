import {StatisticFilterType} from '../utils/const.js';
import {getRuntimeByMinutes, getUserRank} from '../utils/common.js';

const getRankTemplate = (watched) => {
  if (watched) {
    return (
      `<p class="statistic__rank">
      Your rank
      <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
      <span class="statistic__rank-label">${getUserRank(watched)}</span>
    </p>`
    );
  }

  return ``;
};

const getStatisticItemsTemplate = (currentFilter) => {
  return Object.values(StatisticFilterType).map((filter) => {
    return (`<input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-${filter.name}" value="${filter.name}"${currentFilter === filter.name ? ` checked` : ``}>
      <label for="statistic-${filter.name}" class="statistic__filters-label">${filter.text}</label>`);
  })
  .join(`\n`);
};

export const getStatisticTemplate = (cards, duration, topGenre, watched, currentFilter) => {
  return (
    `<section class="statistic visually-hidden">
    ${getRankTemplate(watched)}

    <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
      <p class="statistic__filters-description">Show stats:</p>

      ${getStatisticItemsTemplate(currentFilter)}
    </form>

    <ul class="statistic__text-list">
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">You watched</h4>
        <p class="statistic__item-text">${cards.length} <span class="statistic__item-description">movies</span></p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Total duration</h4>
        <p class="statistic__item-text">${getRuntimeByMinutes(duration, `statistic__item-description`)}</p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Top genre</h4>
        <p class="statistic__item-text">${cards.length ? topGenre : `-`}</p>
      </li>
    </ul>

    <div class="statistic__chart-wrap">
      <canvas class="statistic__chart" width="1000"></canvas>
    </div>

  </section>`
  );
};
