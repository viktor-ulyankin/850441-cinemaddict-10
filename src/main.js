import CardComponent from './components/card.js';
import DetailComponent from './components/detail.js';
import FilterComponent from './components/filter.js';
import SortComponent from './components/sort.js';
import MainContentComponent from './components/main-content.js';
import ShowMoreButtonComponent from './components/show-more-button.js';
import UserRankComponent from './components/user-rank.js';
import {generateCards} from './mock/card.js';
import {getUserRank} from './mock/user-rank.js';
import {render, RenderPosition} from './utils.js';

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

const watchListFilmsQuantity = () => cards.reduce((sum, item) => sum + (item.isOnWatchList ? 1 : 0), 0);

const historyFilmsQuantity = () => cards.reduce((sum, item) => sum + (item.isOnHistory ? 1 : 0), 0);

const favoritesFilmsQuantity = () => cards.reduce((sum, item) => sum + (item.isOnFavorites ? 1 : 0), 0);

render(headerElement, new UserRankComponent(getUserRank()).getElement(), RenderPosition.BEFOREEND);

render(mainElement, new FilterComponent(watchListFilmsQuantity(), historyFilmsQuantity(), favoritesFilmsQuantity()).getElement(), RenderPosition.BEFOREEND);

render(mainElement, new SortComponent().getElement(), RenderPosition.BEFOREEND);

render(mainElement, new MainContentComponent().getElement(), RenderPosition.BEFOREEND);

const filmListContainerElement = mainElement.querySelector(`.films-list .films-list__container`);
let showingCardsCount = FilmCount.LIST;

const setList = (currentCards, targetElement) => currentCards.forEach((card) => {
  const cardElement = new CardComponent(card).getElement();

  render(targetElement, cardElement, RenderPosition.BEFOREEND);

  const cardClickElements = cardElement.querySelectorAll(`.film-card__poster, .film-card__title, .film-card__comments`);

  const onCardClick = () => {
    const detailComponent = new DetailComponent(card);
    const detailElement = detailComponent.getElement();

    render(footerElement, detailElement, RenderPosition.AFTEREND);

    const closeDetailElement = detailElement.querySelector(`.film-details__close-btn`);

    closeDetailElement.addEventListener(`click`, () => {
      detailComponent.removeElement();
      document.querySelector(`.film-details`).remove();
    });
  };

  for (let i = 0; i < cardClickElements.length; i++) {
    cardClickElements[i].addEventListener(`click`, onCardClick);
  }
});

setList(cards.slice(0, showingCardsCount), filmListContainerElement);

render(filmListContainerElement, new ShowMoreButtonComponent().getElement(), RenderPosition.AFTEREND);

const [topRatedElements, mostCommentedElements] = mainElement.querySelectorAll(`.films-list--extra`);
const topRatedContentElements = topRatedElements.querySelector(`.films-list__container`);
const mostCommentedContentElements = mostCommentedElements.querySelector(`.films-list__container`);

if (topRatedCards.length) {
  setList(topRatedCards.slice(0, FilmCount.EXTRA), topRatedContentElements);
} else {
  topRatedElements.remove();
}

if (mostCommentedCards.length) {
  setList(mostCommentedCards.slice(0, FilmCount.EXTRA), mostCommentedContentElements);
} else {
  mostCommentedElements.remove();
}

const showMoreButtonElement = mainElement.querySelector(`.films-list__show-more`);
showMoreButtonElement.addEventListener(`click`, () => {
  const prevTasksCount = showingCardsCount;
  showingCardsCount += FilmCount.LIST;

  setList(cards.slice(prevTasksCount, showingCardsCount), filmListContainerElement);

  if (showingCardsCount >= cards.length) {
    showMoreButtonElement.remove();
  }
});

footerElement.querySelector(`.footer__statistics p`).textContent = `${cards.length} movies inside`;
