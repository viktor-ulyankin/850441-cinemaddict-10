import {remove} from '../utils/common.js';
import AbstractComponent from './abstract-component.js';
import {getMovieTemplate} from '../templates/movie.js';

export default class Movie extends AbstractComponent {
  constructor() {
    super();

    this._card = null;
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
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


  getTemplate() {
    return getMovieTemplate(this._card);
  }

  _onEscKeyDown(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      remove(this);
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }

  _subscribeOnEvents() {
    const element = this.getElement();

    element.querySelector(`.film-details__close-btn`).addEventListener(`click`, () => remove(this));

    document.addEventListener(`keydown`, this._onEscKeyDown);

    element.querySelector(`.film-details__controls`).addEventListener(`change`, (evt) => {
      if (evt.target.classList.contains(`film-details__control-input`)) {
        switch (evt.target.id) {
          case `watchlist`:
            this._onWatchListClickHandler(evt.target.checked);
            break;
          case `watched`:
            this._onWatchedClickHandler(evt.target.checked);
            break;
          case `favorite`:
            this._onFavoriteClickHandler(evt.target.checked);
            break;
        }
      }
    });
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
