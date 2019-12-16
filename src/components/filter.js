import AbstractComponent from './abstract-component.js';
import {getFilterTemplate} from '../templates/filter.js';

export default class Filter extends AbstractComponent {
  constructor(watchListQuantity = 0, watchedQuantity = 0, favoritesQuantity = 0) {
    super();

    this._watchListQuantity = watchListQuantity;
    this._watchedQuantity = watchedQuantity;
    this._favoritesQuantity = favoritesQuantity;
  }

  getTemplate() {
    return getFilterTemplate(this._watchListQuantity, this._watchedQuantity, this._favoritesQuantity);
  }
}
