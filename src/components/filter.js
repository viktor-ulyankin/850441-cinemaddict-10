import AbstractComponent from './abstract-component.js';
import {getFilterTemplate} from '../templates/filter.js';

export default class Filter extends AbstractComponent {
  constructor(filters) {
    super();

    this._filters = filters;
    this._onChangeHandler = null;
    this._onChange = this._onChange.bind(this);
  }

  _getTemplate() {
    return getFilterTemplate(this._filters);
  }

  _onChange(evt) {
    if (evt.target.classList.contains(`main-navigation__item`)) {
      const filterName = evt.target.getAttribute(`href`).slice(1);
      const classActive = `main-navigation__item--active`;

      this._onChangeHandler(filterName);
      this.getElement().querySelector(`.${classActive}`).classList.remove(classActive);
      evt.target.classList.add(classActive);
    }
  }

  onChange(handler) {
    this._onChangeHandler = handler;

    this.getElement().addEventListener(`click`, this._onChange);
  }

  _removeEventListeners() {
    this.getElement().removeEventListener(`click`, this._onChange);
  }
}
