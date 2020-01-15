import AbstractComponent from './abstract-component.js';


export default class AbstractSmartComponent extends AbstractComponent {
  _recoveryListeners() {
    throw new Error(`Abstract method not implemented: _recoveryListeners`);
  }

  rerender() {
    const oldElement = this.getElement();
    const parent = oldElement.parentElement;

    this.remove();

    const newElement = this.getElement();

    parent.replaceChild(newElement, oldElement);

    this._recoveryListeners();
  }
}
