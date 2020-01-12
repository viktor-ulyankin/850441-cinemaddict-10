import AbstractComponent from './abstract-component.js';
import {getRatingFormTemplate} from '../templates/rating-form.js';

export default class RatingForm extends AbstractComponent {
  constructor(card) {
    super();

    this._card = card;
    this._isSending = false;
  }

  render(container, place) {
    super.render(container, place);

    this._isSending = false;

    this.getElement().querySelector(`.film-details__watched-reset`).addEventListener(`click`, () => {
      this._resetRadioInput();
      this._toggleErrorStateForm(false);
    });
  }

  _resetRadioInput() {
    const elementRadioInput = this.getElement().querySelectorAll(`.film-details__user-rating-input`);

    elementRadioInput[this._card.personalRating - 1].checked = true;
  }

  getTemplate() {
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

  onRatingClick(handler) {
    this.getElement().querySelector(`.film-details__user-rating-score`).addEventListener(`change`, (evt) => {
      if (evt.target.classList.contains(`film-details__user-rating-input`) && !this._isSending) {
        this._isSending = true;
        this._toggleErrorStateForm(false);

        handler(evt.target.value)
        .then(() => {
          this._toggleErrorStateForm(false);
        }).catch(() => {
          this._toggleErrorStateForm(true);
          this._isSending = false;
          this._resetRadioInput();
        });
      }
    });
  }

  hide() {
    super.hide();

    this._resetRadioInput();
    this._toggleErrorStateForm(false);
  }
}
