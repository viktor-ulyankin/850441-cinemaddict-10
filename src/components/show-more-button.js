import AbstractComponent from './abstract-component.js';
import {getShowMoreButtonTemplate} from '../templates/show-more-button.js';

export default class ShowMoreButton extends AbstractComponent {
  constructor() {
    super();

    this._onClickHandler = null;
  }

  _getTemplate() {
    return getShowMoreButtonTemplate();
  }

  onClick(handler) {
    this._onClickHandler = handler;

    this.getElement().addEventListener(`click`, this._onClickHandler);
  }

  _removeEventListeners() {
    this.getElement().removeEventListener(`click`, this._onClickHandler);
  }
}
