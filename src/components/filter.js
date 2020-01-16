import AbstractComponent from './abstract-component.js';
import {getFilterTemplate} from '../templates/filter.js';

export default class Filter extends AbstractComponent {
  constructor(filters) {
    super();

    this._filters = filters;
    this._onFilterClickHandler = null;
    this._onFilterClick = this._onFilterClick.bind(this);
  }

  _getTemplate() {
    return getFilterTemplate(this._filters);
  }

  _onFilterClick(evt) {
    if (evt.target.classList.contains(`main-navigation__item`)) {
      const filterName = evt.target.getAttribute(`href`).slice(1);
      const classActive = `main-navigation__item--active`;

      this._onFilterClickHandler(filterName);
      this.getElement().querySelector(`.${classActive}`).classList.remove(classActive);
      evt.target.classList.add(classActive);
    }
  }

  onFilterClick(handler) {
    this._onFilterClickHandler = handler;

    this.getElement().addEventListener(`click`, this._onFilterClick);
  }

  _removeEventListeners() {
    this.getElement().removeEventListener(`click`, this._onFilterClick);
  }
}
