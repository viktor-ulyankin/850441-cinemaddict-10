import {FilterType} from "../utils/const.js";
import {remove} from '../utils/common.js';
import AbstractComponent from './abstract-component.js';
import {getMovieTemplate} from '../templates/movie.js';

export default class Movie extends AbstractComponent {
  constructor() {
    super();

    this._card = null;
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
    this._onCloseClick = this._onCloseClick.bind(this);
    this._onInputChange = this._onInputChange.bind(this);
    this._onFormSubmit = this._onFormSubmit.bind(this);
    this._onCloseHandler = null;
    this._onWatchListClickHandler = null;
    this._onWatchedClickHandler = null;
    this._onFavoriteClickHandler = null;
  }

  render(container, place, card) {
    this._card = card;

    remove(this);

    this._subscribeOnEvents();

    super.render(container, place);
  }

  onClose(handler) {
    this._onCloseHandler = handler;
  }

  _getTemplate() {
    return getMovieTemplate(this._card);
  }

  _close() {
    this._onCloseHandler();
    remove(this);
  }

  _onEscKeyDown(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      this._close();
    }
  }

  _onCloseClick() {
    this._close();
  }

  _onInputChange(evt) {
    if (evt.target.classList.contains(`film-details__control-input`)) {
      switch (evt.target.id) {
        case FilterType.WATCHLIST:
          this._onWatchListClickHandler(evt.target.checked);
          break;
        case FilterType.WATCHED:
          this._onWatchedClickHandler(evt.target.checked);
          break;
        case FilterType.FAVORITE:
          this._onFavoriteClickHandler(evt.target.checked);
          break;
      }
    }
  }

  _onFormSubmit() {
    return false;
  }

  _subscribeOnEvents() {
    const element = this.getElement();

    element.querySelector(`.film-details__inner`).addEventListener(`submit`, this._onFormSubmit);
    element.querySelector(`.film-details__close-btn`).addEventListener(`click`, this._onCloseClick);
    element.querySelector(`.film-details__controls`).addEventListener(`change`, this._onInputChange);
    document.addEventListener(`keydown`, this._onEscKeyDown);
  }

  _removeEventListeners() {
    const element = this.getElement();

    element.querySelector(`.film-details__inner`).removeEventListener(`submit`, this._onFormSubmit);
    element.querySelector(`.film-details__close-btn`).removeEventListener(`click`, this._onCloseClick);
    element.querySelector(`.film-details__controls`).removeEventListener(`change`, this._onInputChange);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }

  onWatchListClick(handler) {
    this._onWatchListClickHandler = handler;
  }

  onWatchedClick(handler) {
    this._onWatchedClickHandler = handler;
  }

  onFavoriteClick(handler) {
    this._onFavoriteClickHandler = handler;
  }
}
