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

  onClick(handler) {
    const element = this.getElement();
    element.querySelector(`.film-card__poster`).addEventListener(`click`, handler);
    element.querySelector(`.film-card__title`).addEventListener(`click`, handler);
    element.querySelector(`.film-card__comments`).addEventListener(`click`, handler);
  }

  onWatchListClick(handler) {
    this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`).addEventListener(`click`, (evt) => {
      evt.preventDefault();
      handler();
    });
  }

  onWatchedClick(handler) {
    this.getElement().querySelector(`.film-card__controls-item--mark-as-watched`).addEventListener(`click`, (evt) => {
      evt.preventDefault();
      handler();
    });
  }

  onFavoriteClick(handler) {
    this.getElement().querySelector(`.film-card__controls-item--favorite`).addEventListener(`click`, (evt) => {
      evt.preventDefault();
      handler();
    });
  }
}
