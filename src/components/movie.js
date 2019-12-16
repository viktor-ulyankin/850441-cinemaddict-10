import {remove} from '../utils/common.js';
import AbstractSmartComponent from './abstract-smart-component.js';
import {getMovieTemplate} from '../templates/movie.js';

export default class Movie extends AbstractSmartComponent {
  constructor(card = null) {
    super();

    this._card = card;
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
    this._subscribeOnEvents();
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
            this.onClickWatchList(evt.target.checked);
            break;
          case `watched`:
            const isChecked = evt.target.checked;
            this.onClickWatched(evt.target.checked);
            this._card.isOnWatched = isChecked;
            this.rerender();
            break;
          case `favorite`:
            this.onClickFavorite(evt.target.checked);
            break;
        }
      }
    });

    element.querySelector(`.film-details__emoji-list`).addEventListener(`change`, (evt) => {
      if (evt.target.classList.contains(`film-details__emoji-item`) && evt.target.checked) {
        const cloneImgElement = evt.target.nextElementSibling.querySelector(`img`).cloneNode();
        const targetElement = element.querySelector(`.film-details__add-emoji-label`);
        targetElement.innerHTML = ``;
        targetElement.appendChild(cloneImgElement);
      }
    });
  }

  onClickWatchList() {}

  onClickWatched() {}

  onClickFavorite() {}

  recoveryListeners() {
    this._subscribeOnEvents();
  }
}
