import {getCardTemplate} from './components/card.js';
import {getDetailTemplate} from './components/detail.js';
import {getMainContentTemplate} from './components/main-content.js';
import {getShowMoreButtonTemplate} from './components/show-more-button.js';
import {getUserRankTemplate} from './components/user-rank.js';

const FilmCount = {
  LIST: 5,
  EXTRA: 2
};

const headerElement = document.querySelector(`.header`);
const footerElement = document.querySelector(`.footer`);
const mainElement = document.querySelector(`.main`);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

render(headerElement, getUserRankTemplate(), `beforeEnd`);

render(footerElement, getDetailTemplate(), `afterEnd`);

render(mainElement, getMainContentTemplate(), `beforeEnd`);

const filmListContainerElement = mainElement.querySelector(`.films-list .films-list__container`);

for (let i = 0; i < FilmCount.LIST; i++) {
  render(filmListContainerElement, getCardTemplate(), `beforeEnd`);
}

render(filmListContainerElement, getShowMoreButtonTemplate(), `afterEnd`);

const filmListExtraContentElements = mainElement.querySelectorAll(`.films-list--extra .films-list__container`);

for (let i = 0; i < filmListExtraContentElements.length; i++) {
  for (let j = 0; j < FilmCount.EXTRA; j++) {
    render(filmListExtraContentElements[i], getCardTemplate(), `beforeEnd`);
  }
}
