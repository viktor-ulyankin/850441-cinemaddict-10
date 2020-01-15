import AbstractComponent from './abstract-component.js';
import {getCommentsTemplate} from '../templates/comments.js';

export default class Comments extends AbstractComponent {
  constructor() {
    super();

    this._comments = null;
    this._emojiSelected = null;
    this._isSending = false;
    this._onEmojiChange = this._onEmojiChange.bind(this);
    this._onDeleteClickHandler = null;
    this._onEnterHandler = null;
    this._onDeleteClick = this._onDeleteClick.bind(this);
    this._onEnter = this._onEnter.bind(this);
  }

  render(container, place, comments = []) {
    this._emojiSelected = null;
    this._comments = comments;
    this._isSending = false;

    this.remove();
    this._subscribeOnEvents();

    super.render(container, place);
  }

  _getTemplate() {
    return getCommentsTemplate(this._comments);
  }

  _toggleErrorStateForm(isError = false) {
    const elementFormAdd = this.getElement().querySelector(`.film-details__new-comment`);
    const classError = `film-details__new-comment_error`;

    if (isError) {
      elementFormAdd.classList.add(classError);
    } else {
      elementFormAdd.classList.remove(classError);
    }
  }

  _onDeleteClick(evt) {
    evt.preventDefault();

    const elementComment = evt.target.closest(`.film-details__comment`);
    const classLoading = `film-details__comment-delete--loading`;

    if (!evt.target.classList.contains(classLoading) && elementComment) {
      evt.target.classList.add(classLoading);
      evt.target.textContent = `Deleting…`;

      this._onDeleteClickHandler(parseInt(elementComment.getAttribute(`data-num`), 10));
    }
  }

  _onEnter(evt) {
    if (evt.key === `Enter` && (evt.ctrlKey || evt.metaKey) && !this._isSending) {
      const textElement = this.getElement().querySelector(`.film-details__comment-input`);

      this._isSending = true;

      if (textElement.value.length && this._emojiSelected) {
        this._toggleErrorStateForm(false);

        this._onEnterHandler(textElement.value, this._emojiSelected)
        .then(() => {
          this._toggleErrorStateForm(false);
        }).catch(() => {
          this._toggleErrorStateForm(true);
          this._isSending = false;
        });
      } else {
        this._toggleErrorStateForm(true);
        this._isSending = false;
      }
    }
  }

  onDeleteClick(handler) {
    this._onDeleteClickHandler = handler;

    this.getElement().querySelectorAll(`.film-details__comment-delete`).forEach((linkElement) => {
      linkElement.addEventListener(`click`, this._onDeleteClick);
    });
  }

  onEnter(handler) {
    this._onEnterHandler = handler;

    document.addEventListener(`keydown`, this._onEnter);
  }

  _onEmojiChange(evt) {
    if (evt.target.classList.contains(`film-details__emoji-item`) && evt.target.checked) {
      const cloneImgElement = evt.target.nextElementSibling.querySelector(`img`).cloneNode();
      const targetElement = this.getElement().querySelector(`.film-details__add-emoji-label`);

      targetElement.innerHTML = ``;
      targetElement.appendChild(cloneImgElement);

      this._emojiSelected = evt.target.value;
    }
  }

  _subscribeOnEvents() {
    this.getElement().querySelector(`.film-details__emoji-list`).addEventListener(`change`, this._onEmojiChange);
  }

  _removeEventListeners() {
    const element = this.getElement();

    element.querySelector(`.film-details__emoji-list`).removeEventListener(`change`, this._onEmojiChange);
    element.querySelectorAll(`.film-details__comment-delete`).forEach((linkElement) => {
      linkElement.removeEventListener(`click`, this._onDeleteClick);
    });
    document.removeEventListener(`keydown`, this._onEnter);
  }
}
