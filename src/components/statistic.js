import AbstractSmartComponent from './abstract-smart-component.js';
import {getStatisticTemplate} from '../templates/statistic.js';
import Chart from 'chart.js';

export default class Statistic extends AbstractSmartComponent {
  constructor(cards, rank) {
    super();

    this._cards = cards;
    this._rank = rank;
    this._watchedCards = this._cards.filter((card) => card.isOnWatched);
    this._watchedDuration = this._watchedCards.reduce((result, card) => result + card.runtime, 0);
    this._quantityByGenres = this._getQuantityByGenres(this._watchedCards);
    this._topGenre = this._getTopGenre(this._quantityByGenres);

    this._renderChart(this._quantityByGenres);
    this._subscribeOnEvents();
  }

  getTemplate() {
    return getStatisticTemplate(this._watchedCards, this._watchedDuration, this._topGenre, this._rank);
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

  _subscribeOnEvents() {
    this.getElement().querySelector(`.statistic__filters`).addEventListener(`change`, (evt) => {
      if (evt.target.classList.contains(`statistic__filters-input`)) {
        this.rerender();
      }
    });
  }

  recoveryListeners() {
    this._renderChart(this._quantityByGenres);
    this._subscribeOnEvents();
  }

  rerender() {
    super.rerender();

    this.show();
  }
}
