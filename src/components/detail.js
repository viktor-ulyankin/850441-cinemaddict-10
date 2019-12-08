import AbstractComponent from './abstract-component.js';
import {getDetailTemplate} from '../templates/detail.js';

export default class Detail extends AbstractComponent {
  constructor(card = null) {
    super();

    this._card = card;
  }

  getTemplate() {
    return getDetailTemplate(this._card);
  }

  render(container, place) {
    super.render(container, place);

    this.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, () => this.remove());

    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        this.remove();
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    document.addEventListener(`keydown`, onEscKeyDown);
  }
}
