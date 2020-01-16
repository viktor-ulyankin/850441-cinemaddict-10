import AbstractComponent from './abstract-component.js';
import {getShowMoreButtonTemplate} from '../templates/show-more-button.js';

export default class ShowMoreButton extends AbstractComponent {
  constructor() {
    super();

    this._onButtonClickHandler = null;
  }

  _getTemplate() {
    return getShowMoreButtonTemplate();
  }

  onButtonClick(handler) {
    this._onButtonClickHandler = handler;

    this.getElement().addEventListener(`click`, this._onButtonClickHandler);
  }

  _removeEventListeners() {
    this.getElement().removeEventListener(`click`, this._onButtonClickHandler);
  }
}
