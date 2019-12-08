import AbstractComponent from './abstract-component.js';
import {getFilterTemplate} from '../templates/filter.js';

export default class Filter extends AbstractComponent {
  constructor(watchListQuantity = 0, historyQuantity = 0, favoritesQuantity = 0) {
    super();

    this._watchListQuantity = watchListQuantity;
    this._historyQuantity = historyQuantity;
    this._favoritesQuantity = favoritesQuantity;
  }

  getTemplate() {
    return getFilterTemplate(this._watchListQuantity, this._historyQuantity, this._favoritesQuantity);
  }
}
