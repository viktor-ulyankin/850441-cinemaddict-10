import AbstractComponent from './abstract-component.js';
import {getSortTemplate} from '../templates/sort.js';
import {SortType} from '../utils/const.js';

export default class Sort extends AbstractComponent {
  constructor() {
    super();

    this._currenSortType = SortType.DEFAULT;
  }

  getTemplate() {
    return getSortTemplate();
  }

  setSortTypeChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();

      if (evt.target.tagName !== `A`) {
        return;
      }

      const sortType = evt.target.dataset.sortType;

      if (this._currenSortType === sortType) {
        return;
      }

      this._currenSortType = sortType;

      handler(this._currenSortType);
    });
  }
}
