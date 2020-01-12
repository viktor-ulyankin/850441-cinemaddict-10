import AbstractComponent from './abstract-component.js';
import {getCommentsTemplate} from '../templates/comments.js';

export default class Comments extends AbstractComponent {
  constructor() {
    super();

    this._comments = null;
    this._emojiSelected = null;
    this._isSending = false;
  }

  render(container, place, comments = []) {
    this._emojiSelected = null;
    this._comments = comments;
    this._isSending = false;

    this.remove();
    this._subscribeOnEvents();

    super.render(container, place);
  }

  getTemplate() {
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

  onDeleteClick(handler) {
    const classLoading = `film-details__comment-delete--loading`;
    const textLoading = `Deleting…`;

    this.getElement().querySelectorAll(`.film-details__comment-delete`).forEach((linkElement, index) => {
      linkElement.addEventListener(`click`, (evt) => {
        evt.preventDefault();

        if (!evt.target.classList.contains(classLoading)) {
          evt.target.classList.add(classLoading);
          evt.target.textContent = textLoading;

          handler(index);
        }
      });
    });
  }

  onEnter(handler) {
    document.addEventListener(`keydown`, (evt) => {
      if (evt.key === `Enter` && (evt.ctrlKey || evt.metaKey) && !this._isSending) {
        const textElement = this.getElement().querySelector(`.film-details__comment-input`);

        this._isSending = true;

        if (textElement.value.length && this._emojiSelected) {
          this._toggleErrorStateForm(false);

          handler(textElement.value, this._emojiSelected)
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
    });
  }

  _subscribeOnEvents() {
    this.getElement().querySelector(`.film-details__emoji-list`).addEventListener(`change`, (evt) => {
      if (evt.target.classList.contains(`film-details__emoji-item`) && evt.target.checked) {
        const cloneImgElement = evt.target.nextElementSibling.querySelector(`img`).cloneNode();
        const targetElement = this.getElement().querySelector(`.film-details__add-emoji-label`);

        targetElement.innerHTML = ``;
        targetElement.appendChild(cloneImgElement);

        this._emojiSelected = evt.target.value;
      }
    });
  }
}
