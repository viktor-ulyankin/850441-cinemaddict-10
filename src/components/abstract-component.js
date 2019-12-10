import {createElement} from '../utils/common.js';
import {RenderPosition} from "../utils/const";


export default class AbstractComponent {
  constructor() {
    if (new.target === AbstractComponent) {
      throw new Error(`Can't instantiate AbstractComponent, only concrete one.`);
    }

    this._element = null;
  }

  getTemplate() {
    throw new Error(`Abstract method not implemented: getTemplate`);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  remove() {
    this.getElement().remove();
    this._element = null;
  }

  render(container, place) {
    if (container) {
      switch (place) {
        case RenderPosition.AFTERBEGIN:
          container.prepend(this.getElement());
          break;
        case RenderPosition.BEFOREEND:
          container.append(this.getElement());
          break;
        case RenderPosition.AFTEREND:
          container.after(this.getElement());
          break;
      }
    }
  }
}
