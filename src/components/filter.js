import AbstractComponent from './abstract-component.js';
import {getFilterTemplate} from '../templates/filter.js';

export default class Filter extends AbstractComponent {
  constructor(filters) {
    super();

    this._filters = filters;

    this.getElement().addEventListener(`click`, (evt) => {
      if (evt.target.classList.contains(`main-navigation__item`)) {
        const filterName = evt.target.getAttribute(`href`).slice(1);
        this.onChange(filterName);
      }
    });
  }

  getTemplate() {
    return getFilterTemplate(this._filters);
  }

  onChange() {}
}
