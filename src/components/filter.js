import {createElement} from '../utils.js';

const getFilterTemplate = (watchListQuantity, historyQuantity, favoritesQuantity) => {
  return (
    `<nav class="main-navigation">
    <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
    <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${watchListQuantity}</span></a>
    <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">${historyQuantity}</span></a>
    <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${favoritesQuantity}</span></a>
    <a href="#stats" class="main-navigation__item main-navigation__item--additional">Stats</a>
  </nav>`
  );
};

export default class Filter {
  constructor(watchListQuantity = 0, historyQuantity = 0, favoritesQuantity = 0) {
    this._element = null;
    this._watchListQuantity = watchListQuantity;
    this._historyQuantity = historyQuantity;
    this._favoritesQuantity = favoritesQuantity;
  }

  getTemplate() {
    return getFilterTemplate(this._watchListQuantity, this._historyQuantity, this._favoritesQuantity);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
