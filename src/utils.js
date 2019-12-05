export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
  AFTEREND: `afterend`,
};

export const getRandomIntegerNumber = (min, max) => min + Math.round(max * Math.random());

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

export const render = (container, element, place) => {
  if (container && element) {
    switch (place) {
      case RenderPosition.AFTERBEGIN:
        container.prepend(element);
        break;
      case RenderPosition.BEFOREEND:
        container.append(element);
        break;
      case RenderPosition.AFTEREND:
        container.after(element);
        break;
    }
  }
};
