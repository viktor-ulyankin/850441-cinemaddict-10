import AbstractComponent from './abstract-component.js';
import {getMainContentTemplate} from '../templates/main-content.js';

export default class MainContent extends AbstractComponent {
  constructor(cardQuantity = 0) {
    super();

    this._cardQuantity = cardQuantity;
  }

  _getTemplate() {
    return getMainContentTemplate(this._cardQuantity);
  }
}
