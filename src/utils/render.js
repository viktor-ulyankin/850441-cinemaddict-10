import {RenderPosition} from '../utils/const.js';

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

export const render = (container, component, place) => {
  if (container && component) {
    switch (place) {
      case RenderPosition.AFTERBEGIN:
        container.prepend(component.getElement());
        break;
      case RenderPosition.BEFOREEND:
        container.append(component.getElement());
        break;
      case RenderPosition.AFTEREND:
        container.after(component.getElement());
        break;
    }
  }
};

export const remove = (component) => {
  component.getElement().remove();
  component.removeElement();
};
