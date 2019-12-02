import {getCardTemplate} from './components/card.js';
import {getDetailTemplate} from './components/detail.js';
import {getFiltersTemplate} from './components/filters.js';
import {getMainContentTemplate} from './components/main-content.js';
import {getShowMoreButtonTemplate} from './components/show-more-button.js';
import {getUserRankTemplate} from './components/user-rank.js';
import {generateCards} from './mock/card.js';
import {getUserRank} from './mock/user-rank.js';

const FilmCount = {
  ALL: 15,
  LIST: 5,
  EXTRA: 2,
};

const cards = generateCards(FilmCount.ALL);

const topRatedCards = cards
.slice()
.sort((prev, next) => next.rating - prev.rating)
.slice(0, 2)
.filter((card) => card.rating);

const mostCommentedCards = cards
.slice()
.sort((prev, next) => next.comments.length - prev.comments.length)
.slice(0, 2)
.filter((card) => card.comments.length);

const headerElement = document.querySelector(`.header`);
const footerElement = document.querySelector(`.footer`);
const mainElement = document.querySelector(`.main`);

const onWatchListFilmsQuantity = () => cards.reduce((sum, item) => sum + (item.isOnWatchList ? 1 : 0), 0);

const onHistoryFilmsQuantity = () => cards.reduce((sum, item) => sum + (item.isOnHistory ? 1 : 0), 0);

const onFavoritesFilmsQuantity = () => cards.reduce((sum, item) => sum + (item.isOnFavorites ? 1 : 0), 0);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

render(headerElement, getUserRankTemplate(getUserRank()), `beforeEnd`);

render(footerElement, getDetailTemplate(cards[0]), `afterEnd`);

render(mainElement, getFiltersTemplate(onWatchListFilmsQuantity(), onHistoryFilmsQuantity(), onFavoritesFilmsQuantity()), `beforeEnd`);

render(mainElement, getMainContentTemplate(), `beforeEnd`);

const filmListContainerElement = mainElement.querySelector(`.films-list .films-list__container`);
let showingCardsCount = FilmCount.LIST;

const setList = (start, end) => cards.slice(start, end).forEach((card) => render(filmListContainerElement, getCardTemplate(card), `beforeend`));

setList(0, showingCardsCount);

render(filmListContainerElement, getShowMoreButtonTemplate(), `afterEnd`);

const [topRatedElements, mostCommentedElements] = mainElement.querySelectorAll(`.films-list--extra`);
const topRatedContentElements = topRatedElements.querySelector(`.films-list__container`);
const mostCommentedContentElements = mostCommentedElements.querySelector(`.films-list__container`);

if (topRatedCards.length) {
  topRatedCards.slice(0, FilmCount.EXTRA).forEach((card) => render(topRatedContentElements, getCardTemplate(card), `beforeend`));
} else {
  topRatedElements.remove();
}

if (mostCommentedCards.length) {
  mostCommentedCards.slice(0, FilmCount.EXTRA).forEach((card) => render(mostCommentedContentElements, getCardTemplate(card), `beforeend`));
} else {
  mostCommentedElements.remove();
}

const showMoreButtonElement = mainElement.querySelector(`.films-list__show-more`);
showMoreButtonElement.addEventListener(`click`, () => {
  const prevTasksCount = showingCardsCount;
  showingCardsCount += FilmCount.LIST;

  setList(prevTasksCount, showingCardsCount);

  if (showingCardsCount >= cards.length) {
    showMoreButtonElement.remove();
  }
});

footerElement.querySelector(`.footer__statistics p`).textContent = `${cards.length} movies inside`;
