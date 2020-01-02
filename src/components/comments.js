import AbstractComponent from './abstract-component.js';
import {getCommentsTemplate} from '../templates/comments.js';

export default class Comments extends AbstractComponent {
  constructor() {
    super();

    this._comments = null;
    this._onCmdEnterKeyDown = this._onCmdEnterKeyDown.bind(this);
    this.onClickCommentDelete = this.onClickCommentDelete.bind(this);
    this.onAddComment = this.onAddComment.bind(this);
    this._emojiSelected = null;
    this.isSending = false;
  }

  render(container, place, comments = []) {
    this._emojiSelected = null;
    this._comments = comments;
    this.isSending = false;

    this.remove();
    this._subscribeOnEvents();

    super.render(container, place);
  }

  getTemplate() {
    return getCommentsTemplate(this._comments);
  }

  _onCmdEnterKeyDown(evt) {
    if (evt.key === `Enter` && (evt.ctrlKey || evt.metaKey) && !this.isSending) {
      this.isSending = true;
      this._addComment();
    }
  }

  _addComment() {
    const textElement = this.getElement().querySelector(`.film-details__comment-input`);

    if (textElement.value.length && this._emojiSelected) {
      this._toggleErrorStateForm(false);

      this.onAddComment(textElement.value, this._emojiSelected)
      .then(() => {
        this._toggleErrorStateForm(false);
      }).catch(() => {
        this._toggleErrorStateForm(true);
        this.isSending = false;
      });
    }
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

  _subscribeOnEvents() {
    const linkToCommentDeleteElement = this.getElement().querySelectorAll(`.film-details__comment-delete`);

    linkToCommentDeleteElement.forEach((linkElement, index) => {
      linkElement.addEventListener(`click`, (e) => {
        e.preventDefault();
        this.onClickCommentDelete(index);
      });
    });

    document.addEventListener(`keydown`, this._onCmdEnterKeyDown);

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

  onClickCommentDelete() {}

  onAddComment() {}
}
