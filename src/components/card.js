import AbstractComponent from './abstract-component.js';
import {getCardTemplate} from '../templates/card.js';

export default class Card extends AbstractComponent {
  constructor(card = null) {
    super();

    this._card = card;
    this._onWatchListClick = this._onWatchListClick.bind(this);
    this._onWatchedClick = this._onWatchedClick.bind(this);
    this._onFavoriteClick = this._onFavoriteClick.bind(this);
    this._onCardClickHandler = null;
    this._onWatchListClickHandler = null;
    this._onWatchedClickHandler = null;
    this._onFavoriteClickHandler = null;
  }

  _getTemplate() {
    return getCardTemplate(this._card);
  }

  _onWatchListClick(evt) {
    evt.preventDefault();
    this._onWatchListClickHandler();
  }

  _onWatchedClick(evt) {
    evt.preventDefault();
    this._onWatchedClickHandler();
  }

  _onFavoriteClick(evt) {
    evt.preventDefault();
    this._onFavoriteClickHandler();
  }

  onCardClick(handler) {
    this._onCardClickHandler = handler;

    const element = this.getElement();

    element.querySelector(`.film-card__poster`).addEventListener(`click`, this._onCardClickHandler);
    element.querySelector(`.film-card__title`).addEventListener(`click`, this._onCardClickHandler);
    element.querySelector(`.film-card__comments`).addEventListener(`click`, this._onCardClickHandler);
  }

  onWatchListClick(handler) {
    this._onWatchListClickHandler = handler;

    this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`).addEventListener(`click`, this._onWatchListClick);
  }

  onWatchedClick(handler) {
    this._onWatchedClickHandler = handler;

    this.getElement().querySelector(`.film-card__controls-item--mark-as-watched`).addEventListener(`click`, this._onWatchedClick);
  }

  onFavoriteClick(handler) {
    this._onFavoriteClickHandler = handler;

    this.getElement().querySelector(`.film-card__controls-item--favorite`).addEventListener(`click`, this._onFavoriteClick);
  }

  _removeEventListeners() {
    const element = this.getElement();

    element.querySelector(`.film-card__poster`).removeEventListener(`click`, this._onCardClickHandler);
    element.querySelector(`.film-card__title`).removeEventListener(`click`, this._onCardClickHandler);
    element.querySelector(`.film-card__comments`).removeEventListener(`click`, this._onCardClickHandler);
    element.querySelector(`.film-card__controls-item--add-to-watchlist`).removeEventListener(`click`, this._onWatchListClick);
    element.querySelector(`.film-card__controls-item--mark-as-watched`).removeEventListener(`click`, this._onWatchedClick);
    element.querySelector(`.film-card__controls-item--favorite`).removeEventListener(`click`, this._onFavoriteClick);
  }
}
