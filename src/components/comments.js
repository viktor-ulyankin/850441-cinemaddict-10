import AbstractSmartComponent from './abstract-smart-component.js';
import {getCommentsTemplate} from '../templates/comments.js';

export default class Comments extends AbstractSmartComponent {
  constructor(comments = []) {
    super();

    this._comments = comments;
    this._onCmdEnterKeyDown = this._onCmdEnterKeyDown.bind(this);
    this.onClickCommentDelete = this.onClickCommentDelete.bind(this);
    this.onAddComment = this.onAddComment.bind(this);
    this._emojiSelected = null;

    this._subscribeOnEvents();
  }

  getTemplate() {
    return getCommentsTemplate(this._comments);
  }

  _onCmdEnterKeyDown(evt) {
    if (evt.key === `Enter` && (evt.ctrlKey || evt.metaKey)) {
      this._addComment();
    }
  }

  _addComment() {
    const textElement = this.getElement().querySelector(`.film-details__comment-input`);

    if (textElement.value.length && this._emojiSelected) {
      this.onAddComment(textElement.value, this._emojiSelected);
      this.rerender();
    }
  }

  _subscribeOnEvents() {
    const linkToCommentDeleteElement = this.getElement().querySelectorAll(`.film-details__comment-delete`);

    linkToCommentDeleteElement.forEach((linkElement, index) => {
      linkElement.addEventListener(`click`, (e) => {
        e.preventDefault();
        this.onClickCommentDelete(index);
        this.rerender();
      });
    });

    document.addEventListener(`keydown`, this._onCmdEnterKeyDown);

    this.getElement().querySelector(`.film-details__emoji-list`).addEventListener(`change`, (evt) => {
      if (evt.target.classList.contains(`film-details__emoji-item`) && evt.target.checked) {
        const cloneImgElement = evt.target.nextElementSibling.querySelector(`img`).cloneNode();
        const targetElement = this.getElement().querySelector(`.film-details__add-emoji-label`);

        targetElement.innerHTML = ``;
        targetElement.appendChild(cloneImgElement);

        this._emojiSelected = this.getElement().querySelector(`.film-details__emoji-label[for=${evt.target.id}] img`).getAttribute(`src`);
      }
    });
  }

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
