import {SortType, FilmCount, RenderPosition} from '../utils/const.js';
import {remove} from '../utils/common.js';
import FilterComponent from '../components/filter.js';
import SortComponent from '../components/sort.js';
import MainContentComponent from '../components/main-content.js';
import ShowMoreButtonComponent from '../components/show-more-button.js';
import MovieController from './movie.js';

export default class PageController {
  constructor(container) {
    this._container = container;
    this._onViewChange = this._onViewChange.bind(this);
    this._showedMovieControllers = [];
  }

  render(cards) {


    // Рендер фильтра

    const watchListFilmsQuantity = () => cards.reduce((sum, item) => sum + (item.isOnWatchList ? 1 : 0), 0);
    const watchedFilmsQuantity = () => cards.reduce((sum, item) => sum + (item.isOnWatched ? 1 : 0), 0);
    const favoritesFilmsQuantity = () => cards.reduce((sum, item) => sum + (item.isOnFavorites ? 1 : 0), 0);
    const filterComponent = new FilterComponent(watchListFilmsQuantity(), watchedFilmsQuantity(), favoritesFilmsQuantity());
    filterComponent.render(this._container, RenderPosition.BEFOREEND);


    // Рендер контейнеров для списков фильмов

    const mainContentComponent = new MainContentComponent(cards.length);
    mainContentComponent.render(this._container, RenderPosition.BEFOREEND);


    // Функция установки указанного списка фильмов в указаное место

    const renderCards = (currentCards, targetElement) => currentCards.forEach((card) => {
      const movieController = new MovieController(targetElement, this._container, this._onDataChange, this._onViewChange);
      movieController.render(card);
      this._showedMovieControllers.push(movieController);
    });


    // Рендер начального состояния главного списка фильмов

    let showingCardsCount = FilmCount.LIST;
    const filmListContainerElement = this._container.querySelector(`.films-list .films-list__container`);
    renderCards(cards.slice(0, showingCardsCount), filmListContainerElement);


    // Рендер сортировки

    let updatedCards = cards;
    const sortComponent = new SortComponent();
    sortComponent.render(filterComponent.getElement(), RenderPosition.AFTEREND);
    sortComponent.onChangeSortType((sortType) => {

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
      renderCards(updatedCards.slice(0, showingCardsCount), filmListContainerElement);
    });


    // Рендер кнопки "Show more"

    const showMoreButtonComponent = new ShowMoreButtonComponent();
    showMoreButtonComponent.render(filmListContainerElement, RenderPosition.AFTEREND);
    showMoreButtonComponent.onClick(() => {
      const prevTasksCount = showingCardsCount;
      showingCardsCount += FilmCount.LIST;

      renderCards(updatedCards.slice(prevTasksCount, showingCardsCount), filmListContainerElement);

      if (showingCardsCount >= cards.length) {
        remove(showMoreButtonComponent);
      }
    });


    // Рендер "Top rated" и "Most commented"

    const [topRatedElements, mostCommentedElements] = this._container.querySelectorAll(`.films-list--extra`);
    const topRatedContentElements = topRatedElements.querySelector(`.films-list__container`);
    const mostCommentedContentElements = mostCommentedElements.querySelector(`.films-list__container`);

    const topRatedCards = cards
    .slice()
    .sort((prev, next) => next.rating - prev.rating)
    .slice(0, 2)
    .filter((card) => card.rating);

    if (topRatedCards.length) {
      renderCards(topRatedCards.slice(0, FilmCount.EXTRA), topRatedContentElements);
    } else {
      topRatedElements.remove();
    }

    const mostCommentedCards = cards
    .slice()
    .sort((prev, next) => next.comments.length - prev.comments.length)
    .slice(0, 2)
    .filter((card) => card.comments.length);

    if (mostCommentedCards.length) {
      renderCards(mostCommentedCards.slice(0, FilmCount.EXTRA), mostCommentedContentElements);
    } else {
      mostCommentedElements.remove();
    }


  }


  // Обновление данных фильма

  _onDataChange(movieController, oldCard, newCard) {
    movieController.render(newCard);
  }


  // Установка состояния по умолчанию у всех movieController

  _onViewChange() {
    this._showedMovieControllers.forEach((movieController) => movieController.setDefaultView());
  }


}
