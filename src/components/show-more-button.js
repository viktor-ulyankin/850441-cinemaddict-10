import AbstractComponent from './abstract-component.js';
import {getShowMoreButtonTemplate} from '../templates/show-more-button.js';

export default class ShowMoreButton extends AbstractComponent {
  getTemplate() {
    return getShowMoreButtonTemplate();
  }

  setClickHandler(handler) {
    this.getElement().addEventListener(`click`, handler);
  }
}
