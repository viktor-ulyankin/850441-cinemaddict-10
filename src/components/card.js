import AbstractComponent from './abstract-component.js';
import {getCardTemplate} from '../templates/card.js';

export default class Card extends AbstractComponent {
  constructor(card = null) {
    super();

    this._card = card;
  }

  getTemplate() {
    return getCardTemplate(this._card);
  }

  setClickHandler(handler) {
    this.getElement().querySelector(`.film-card__poster`).addEventListener(`click`, handler);
    this.getElement().querySelector(`.film-card__title`).addEventListener(`click`, handler);
    this.getElement().querySelector(`.film-card__comments`).addEventListener(`click`, handler);
  }
}
