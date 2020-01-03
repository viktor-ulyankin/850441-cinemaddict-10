import moment from 'moment';

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

export const replace = (newComponent, oldComponent) => {
  if (newComponent && oldComponent) {
    const parentElement = oldComponent.getElement().parentElement;
    const newElement = newComponent.getElement();
    const oldElement = oldComponent.getElement();
    const isExistElements = !!(parentElement && newElement && oldElement);

    if (isExistElements && parentElement.contains(oldElement)) {
      parentElement.replaceChild(newElement, oldElement);
    }
  }
};

export const remove = (component) => {
  if (component) {
    component.getElement().remove();
    component.remove();
  }
};

export const formatFilmReleaseDate = (date) => moment(date).format(`DD MMMM YYYY`);

export const formatFilmReleaseYear = (date) => moment(date).format(`YYYY`);

export const formatCommentDate = (date) => moment(date).format(`YYYY/M/D hh:mm`);

export const getRandomDate = (startDate, endDate) => new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime()));

export const getRuntimeByMinutes = (minutes, wordClassContainer) => {
  if (wordClassContainer) {
    return `${minutes / 60 ^ 0}<span class="${wordClassContainer}">h</span> ${minutes % 60}<span class="${wordClassContainer}">m</span>`;
  }

  return `${minutes / 60 ^ 0}h ${minutes % 60}m`;
};
