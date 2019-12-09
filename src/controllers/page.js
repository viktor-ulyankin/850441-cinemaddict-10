import {SortType} from '../utils/const.js';
import CardComponent from '../components/card.js';
import DetailComponent from '../components/detail.js';
import FilterComponent from '../components/filter.js';
import SortComponent from '../components/sort.js';
import MainContentComponent from '../components/main-content.js';
import ShowMoreButtonComponent from '../components/show-more-button.js';
import {FilmCount, RenderPosition} from '../utils/const.js';

export default class PageController {
  constructor(container) {
    this.container = container;
  }

  render(cards) {


    // Рендер фильтра

    const watchListFilmsQuantity = () => cards.reduce((sum, item) => sum + (item.isOnWatchList ? 1 : 0), 0);
    const historyFilmsQuantity = () => cards.reduce((sum, item) => sum + (item.isOnHistory ? 1 : 0), 0);
    const favoritesFilmsQuantity = () => cards.reduce((sum, item) => sum + (item.isOnFavorites ? 1 : 0), 0);
    const filterComponent = new FilterComponent(watchListFilmsQuantity(), historyFilmsQuantity(), favoritesFilmsQuantity());
    filterComponent.render(this.container, RenderPosition.BEFOREEND);


    // Рендер контейнеров для списков фильмов

    const mainContentComponent = new MainContentComponent(cards.length);
    mainContentComponent.render(this.container, RenderPosition.BEFOREEND);


    // Функция установки указанного списка фильмов в указаное место

    const setList = (currentCards, targetElement) => currentCards.forEach((card) => {
      const cardElement = new CardComponent(card);
      cardElement.render(targetElement, RenderPosition.BEFOREEND);

      cardElement.setClickHandler(() => {
        const detailComponent = new DetailComponent(card);
        detailComponent.render(this.container, RenderPosition.AFTEREND);
      });
    });


    // Рендер начального состояния главного списка фильмов

    let showingCardsCount = FilmCount.LIST;
    const filmListContainerElement = this.container.querySelector(`.films-list .films-list__container`);
    setList(cards.slice(0, showingCardsCount), filmListContainerElement);


    // Рендер сортировки

    let updatedCards = cards;
    const sortComponent = new SortComponent();
    sortComponent.render(filterComponent.getElement(), RenderPosition.AFTEREND);
    sortComponent.setSortTypeChangeHandler((sortType) => {

      switch (sortType) {
        case SortType.DATE:
          updatedCards = cards
          .slice()
          .sort((prev, next) => next.releaseDate - prev.releaseDate);
          break;
        case SortType.RATING:
          updatedCards = cards
          .slice()
          .sort((prev, next) => next.rating - prev.rating);
          break;
        case SortType.DEFAULT:
          updatedCards = cards;
          break;
      }

      filmListContainerElement.innerHTML = ``;
      setList(updatedCards.slice(0, showingCardsCount), filmListContainerElement);
    });


    // Рендер кнопки "Show more"

    const showMoreButtonComponent = new ShowMoreButtonComponent();
    showMoreButtonComponent.render(filmListContainerElement, RenderPosition.AFTEREND);
    showMoreButtonComponent.setClickHandler(() => {
      const prevTasksCount = showingCardsCount;
      showingCardsCount += FilmCount.LIST;

      setList(updatedCards.slice(prevTasksCount, showingCardsCount), filmListContainerElement);

      if (showingCardsCount >= cards.length) {
        showMoreButtonComponent.remove();
      }
    });


    // Рендер "Top rated" и "Most commented"

    const [topRatedElements, mostCommentedElements] = this.container.querySelectorAll(`.films-list--extra`);
    const topRatedContentElements = topRatedElements.querySelector(`.films-list__container`);
    const mostCommentedContentElements = mostCommentedElements.querySelector(`.films-list__container`);

    const topRatedCards = cards
    .slice()
    .sort((prev, next) => next.rating - prev.rating)
    .slice(0, 2)
    .filter((card) => card.rating);

    if (topRatedCards.length) {
      setList(topRatedCards.slice(0, FilmCount.EXTRA), topRatedContentElements);
    } else {
      topRatedElements.remove();
    }

    const mostCommentedCards = cards
    .slice()
    .sort((prev, next) => next.comments.length - prev.comments.length)
    .slice(0, 2)
    .filter((card) => card.comments.length);

    if (mostCommentedCards.length) {
      setList(mostCommentedCards.slice(0, FilmCount.EXTRA), mostCommentedContentElements);
    } else {
      mostCommentedElements.remove();
    }


  }
}
