import {remove} from '../utils/common.js';
import AbstractSmartComponent from './abstract-smart-component.js';
import {getMovieTemplate} from '../templates/movie.js';

export default class Movie extends AbstractSmartComponent {
  constructor(card = null) {
    super();

    this._card = card;
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
    this._onCmdEnterKeyDown = this._onCmdEnterKeyDown.bind(this);
    this.onClickCommentDelete = this.onClickCommentDelete.bind(this);
    this.onAddComment = this.onAddComment.bind(this);
    this._emojiSelected = null;
    this._subscribeOnEvents();
  }

  getTemplate() {
    return getMovieTemplate(this._card);
  }

  _onEscKeyDown(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      remove(this);
      document.removeEventListener(`keydown`, this._onEscKeyDown);
      document.removeEventListener(`keydown`, this._onCmdEnterKeyDown);
    }
  }

  _onCmdEnterKeyDown(evt) {
    if (evt.key === `Enter` && (evt.ctrlKey || evt.metaKey)) {
      this._addComment();
    }
  }

  _addComment() {
    const textElement = document.querySelector(`.film-details__comment-input`);

    if (textElement.value.length && this._emojiSelected) {
      this.onAddComment(textElement.value, this._emojiSelected);
      this.rerender();
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
            this.onClickWatched(evt.target.checked);
            this._card.isOnWatched = evt.target.checked;
            this.rerender();
            break;
          case `favorite`:
            this.onClickFavorite(evt.target.checked);
            break;
        }
      }
    });

    const linkToCommentDeleteElement = element.querySelectorAll(`.film-details__comment-delete`);

    linkToCommentDeleteElement.forEach((linkElement, index) => {
      linkElement.addEventListener(`click`, (e) => {
        e.preventDefault();
        this.onClickCommentDelete(index);
        this.rerender();
      });
    });

    document.addEventListener(`keydown`, this._onCmdEnterKeyDown);

    element.querySelector(`.film-details__emoji-list`).addEventListener(`change`, (evt) => {
      if (evt.target.classList.contains(`film-details__emoji-item`) && evt.target.checked) {
        const cloneImgElement = evt.target.nextElementSibling.querySelector(`img`).cloneNode();
        const targetElement = element.querySelector(`.film-details__add-emoji-label`);
        targetElement.innerHTML = ``;
        targetElement.appendChild(cloneImgElement);

        const imgTargetElement = element.querySelector(`.film-details__emoji-label[for=${evt.target.id}] img`);
        this._emojiSelected = imgTargetElement.getAttribute(`src`);
      }
    });
  }

  onClickWatchList() {}

  onClickWatched() {}

  onClickFavorite() {}

  onClickCommentDelete() {}

  onAddComment() {}

  recoveryListeners() {
    this._subscribeOnEvents();
  }

  rerender() {
    super.rerender();

    this._emojiSelected = null;
  }
}
