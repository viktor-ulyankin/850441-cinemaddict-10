import AbstractComponent from './abstract-component.js';
import {getRatingFormTemplate} from '../templates/rating-form.js';

export default class RatingForm extends AbstractComponent {
  constructor() {
    super();

    this._card = null;
    this._isSending = false;
    this._onRatingClickHandler = null;
    this._onRatingClick = this._onRatingClick.bind(this);
    this._onResetClick = this._onResetClick.bind(this);
  }

  render(card, container, place) {
    this._card = card;

    super.render(container, place);

    this._isSending = false;

    this._subscribeOnEvents();
  }

  _resetRadioInput() {
    if (this._card.isOnWatched) {
      const elementRadioInput = this.getElement().querySelectorAll(`.film-details__user-rating-input`);

      if (this._card.personalRating) {
        elementRadioInput[this._card.personalRating - 1].checked = true;
      }
    }
  }

  _getTemplate() {
    return getRatingFormTemplate(this._card);
  }

  _toggleErrorStateForm(isError = false) {
    const elementForm = this.getElement().querySelector(`.film-details__user-rating-score`);
    const classError = `film-details__user-rating-score_error`;

    if (isError) {
      elementForm.classList.add(classError);
    } else {
      elementForm.classList.remove(classError);
    }
  }

  _onRatingClick(evt) {
    if (evt.target.classList.contains(`film-details__user-rating-input`) && !this._isSending) {
      this._isSending = true;
      this._toggleErrorStateForm(false);

      this._onRatingClickHandler(evt.target.value)
      .then(() => {
        this._toggleErrorStateForm(false);
      }).catch(() => {
        this._toggleErrorStateForm(true);
        this._isSending = false;
        this._resetRadioInput();
      });
    }
  }

  onRatingClick(handler) {
    this._onRatingClickHandler = handler;

    this.getElement().querySelector(`.film-details__user-rating-score`).addEventListener(`change`, this._onRatingClick);
  }

  show() {
    super.show();

    this._resetRadioInput();
    this._toggleErrorStateForm(false);
  }

  hide() {
    super.hide();

    this._resetRadioInput();
    this._toggleErrorStateForm(false);
  }

  _onResetClick() {
    this._resetRadioInput();
    this._toggleErrorStateForm(false);
  }

  _subscribeOnEvents() {
    this.getElement().querySelector(`.film-details__watched-reset`).addEventListener(`click`, this._onResetClick);
  }

  _removeEventListeners() {
    const element = this.getElement();

    element.querySelector(`.film-details__user-rating-score`).removeEventListener(`change`, this._onRatingClick);
    element.querySelector(`.film-details__watched-reset`).removeEventListener(`click`, this._onResetClick);
  }
}
