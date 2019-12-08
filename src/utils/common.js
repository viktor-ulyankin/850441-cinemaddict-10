export const getRandomIntegerNumber = (min, max) => min + Math.round(max * Math.random());

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

