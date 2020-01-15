import AbstractComponent from './abstract-component.js';
import {getSortTemplate} from '../templates/sort.js';
import {SortType} from '../utils/const.js';

export default class Sort extends AbstractComponent {
  constructor() {
    super();

    this._currenSortType = SortType.DEFAULT;
    this._onChangeSortTypeHandler = null;
    this._onChangeSortType = this._onChangeSortType.bind(this);
  }

  _getTemplate() {
    return getSortTemplate();
  }

  _onChangeSortType(evt) {
    evt.preventDefault();

    if (evt.target.tagName !== `A`) {
      return;
    }

    const sortType = evt.target.getAttribute(`data-sort-type`);

    if (this._currenSortType === sortType) {
      return;
    }

    this._currenSortType = sortType;
    this._onChangeSortTypeHandler(this._currenSortType);

    const classActive = `sort__button--active`;

    this.getElement().querySelector(`.${classActive}`).classList.remove(classActive);
    evt.target.classList.add(classActive);
  }

  onChangeSortType(handler) {
    this._onChangeSortTypeHandler = handler;

    this.getElement().addEventListener(`click`, this._onChangeSortType);
  }

  _removeEventListeners() {
    this.getElement().removeEventListener(`click`, this._onChangeSortType);
  }
}
