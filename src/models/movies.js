import {FilterType} from '../utils/const.js';
import {getCardsByFilter} from '../utils/filter.js';

export default class Movie {
  constructor() {
    this._cards = [];
    this._activeFilterType = FilterType.ALL;
    this._onFilterChangeHandler = null;
    this._onDataChangeHandler = null;
  }

  getItems() {
    return getCardsByFilter(this._cards, this._activeFilterType);
  }

  getAllItems() {
    return this._cards;
  }

  setItems(cards) {
    this._cards = Array.from(cards);
  }

  updateItem(id, card) {
    const index = this._cards.findIndex((it) => it.id === id);

    if (index === -1) {
      return false;
    }

    this._cards = [].concat(this._cards.slice(0, index), card, this._cards.slice(index + 1));

    this._onDataChangeHandler();

    return true;
  }

  setFilter(filterType) {
    this._activeFilterType = filterType;
    this._onFilterChangeHandler();
  }

  onFilterChange(handler) {
    this._onFilterChangeHandler = handler;
  }

  onDataChange(handler) {
    this._onDataChangeHandler = handler;
  }
}
