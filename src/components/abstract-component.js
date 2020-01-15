import {createElement} from '../utils/common.js';
import {RenderPosition} from "../utils/const.js";


export default class AbstractComponent {
  constructor() {
    if (new.target === AbstractComponent) {
      throw new Error(`Can't instantiate AbstractComponent, only concrete one.`);
    }

    this._element = null;
    this._classHidden = `visually-hidden`;
  }

  _getTemplate() {
    throw new Error(`Abstract method not implemented: getTemplate`);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this._getTemplate());
    }

    return this._element;
  }

  remove() {
    this._removeEventListeners();
    this._element = null;
  }

  render(container, place) {
    if (container && place) {
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

  show() {
    if (this._element) {
      this._element.classList.remove(this._classHidden);
    }
  }

  hide() {
    if (this._element) {
      this._element.classList.add(this._classHidden);
    }
  }

  _removeEventListeners() {}
}
