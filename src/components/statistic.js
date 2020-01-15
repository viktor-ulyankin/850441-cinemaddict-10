import {StatisticFilterType} from '../utils/const.js';
import AbstractSmartComponent from './abstract-smart-component.js';
import {getStatisticTemplate} from '../templates/statistic.js';
import Chart from 'chart.js';

export default class Statistic extends AbstractSmartComponent {
  constructor(cards, rank) {
    super();

    this._cards = cards;
    this._rank = rank;
    this._currentFilter = StatisticFilterType.ALL.name;
    this._onFilterClick = this._onFilterClick.bind(this);
    this._setFilter();
    this._renderChart(this._quantityByGenres);
    this._subscribeOnEvents();
  }

  _getTemplate() {
    return getStatisticTemplate(this._watchedCards, this._watchedDuration, this._topGenre, this._rank, this._currentFilter);
  }

  _getQuantityByGenres(cards) {
    return cards.reduce((result, card) => {
      card.genres.forEach((genre) => {
        result[genre] = (result[genre] || 0) + 1;
      });

      return result;
    }, {});
  }

  _getTopGenre(quantity) {
    let topGenre = ``;
    let maxQuantity = 0;

    for (let prop in quantity) {
      if (quantity[prop] > maxQuantity) {
        maxQuantity = quantity[prop];
        topGenre = prop;
      }
    }

    return topGenre;
  }

  _renderChart(data) {
    const keys = Object.keys(data);
    const values = Object.values(data);

    if (keys.length) {
      const ctx = this.getElement().querySelector(`.statistic__chart`);

      return new Chart(ctx, {
        type: `horizontalBar`,
        data: {
          labels: keys,
          datasets: [{
            label: `watched`,
            data: values,
            backgroundColor: `#ffe800`,
          }]
        },
        options: {
          legend: {display: false},
          scales: {
            xAxes: [{
              stacked: true,
            }],
            yAxes: [{
              stacked: true,
            }],
          }
        },
      });
    }

    return false;
  }

  _onFilterClick(evt) {
    if (evt.target.classList.contains(`statistic__filters-input`)) {
      this._setFilter(evt.target.value);
      this.rerender();
      this.show();
    }
  }

  _subscribeOnEvents() {
    this.getElement().querySelector(`.statistic__filters`).addEventListener(`click`, this._onFilterClick);
  }

  _removeEventListeners() {
    this.getElement().querySelector(`.statistic__filters`).removeEventListener(`click`, this._onFilterClick);
  }

  _recoveryListeners() {
    this._renderChart(this._quantityByGenres);
    this._subscribeOnEvents();
  }

  _setFilter(filter) {
    this._watchedCards = this._cards.filter((card) => card.isOnWatched);

    if (filter) {
      let filterDate = 0;

      switch (filter) {
        case StatisticFilterType.TODAY.name:
          filterDate = new Date();
          filterDate.setDate(filterDate.getDate() - 1);
          break;
        case StatisticFilterType.WEEK.name:
          filterDate = new Date();
          filterDate.setDate(filterDate.getDate() - 7);
          break;
        case StatisticFilterType.MONTH.name:
          filterDate = new Date();
          filterDate.setDate(filterDate.getDate() - 30);
          break;
        case StatisticFilterType.YEAR.name:
          filterDate = new Date();
          filterDate.setDate(filterDate.getDate() - 365);
          break;
      }

      this._watchedCards = this._watchedCards.filter((card) => card.watchingDate > filterDate);
      this._currentFilter = filter;
    }

    this._watchedDuration = this._watchedCards.reduce((result, card) => result + card.runtime, 0);
    this._quantityByGenres = this._getQuantityByGenres(this._watchedCards);
    this._topGenre = this._getTopGenre(this._quantityByGenres);
  }
}
