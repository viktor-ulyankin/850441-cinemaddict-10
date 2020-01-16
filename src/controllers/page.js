import {SortType, FilmCount, RenderPosition} from '../utils/const.js';
import {remove} from '../utils/common.js';
import SortComponent from '../components/sort.js';
import MainContentComponent from '../components/main-content.js';
import ShowMoreButtonComponent from '../components/show-more-button.js';
import MovieController from './movie.js';
import StatisticComponent from "../components/statistic.js";

export default class PageController {
  constructor(container, movieModel, userRank, api) {
    this._container = container;
    this._movieModel = movieModel;
    this._userRank = userRank;
    this._api = api;
    this._allCards = this._movieModel.getAllItems();
    this._onFilterChange = this._onFilterChange.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._movieModel.onFilterChange(this._onFilterChange);
    this._sortComponent = new SortComponent();
    this._mainContentComponent = new MainContentComponent(this._allCards.length);
    this._showMoreButtonComponent = new ShowMoreButtonComponent();
    this._statisticComponent = new StatisticComponent(this._allCards, this._userRank);
    this._showedAllMovieControllers = [];
    this._showedMainMovieControllers = [];
    this._filmListContainerElement = null;
    this._showingCardsCount = 0;
    this._sortTypeMainList = SortType.DEFAULT;
  }

  render() {
    // Рендер сортировки
    this._sortComponent.render(this._container, RenderPosition.BEFOREEND);
    this._sortComponent.onChangeSortType((sortType) => {
      this._sortTypeMainList = sortType;
      this._removeMainCards();
      this._renderCards(this._getSortedCards(this._sortTypeMainList).slice(0, this._showingCardsCount));
    });

    // Рендер контейнеров для списков фильмов
    this._mainContentComponent.render(this._container, RenderPosition.BEFOREEND);
    this._filmListContainerElement = this._container.querySelector(`.films-list .films-list__container`);

    // Рендер начального состояния главного списка фильмов и кнопки Show more
    this._renderCards(this._movieModel.getItems().slice(0, FilmCount.LIST));
    this._showingCardsCount = FilmCount.LIST;
    this._renderShowMoreButton();
    this._renderExtraList();

    // Рендер статистики
    this._statisticComponent.render(this._container, RenderPosition.BEFOREEND);
  }

  // Рендер "Top rated" и "Most commented"
  _renderExtraList() {
    const [topRatedElements, mostCommentedElements] = this._container.querySelectorAll(`.films-list--extra`);
    this._renderTopRated(topRatedElements, this._allCards);
    this._renderMostCommented(mostCommentedElements, this._allCards);
  }

  // Сортировка фильмов
  _getSortedCards(sortType) {
    const cards = this._movieModel.getItems();

    switch (sortType) {
      case SortType.DATE:
        return cards
        .slice()
        .sort((prev, next) => next.releaseDate - prev.releaseDate);
      case SortType.RATING:
        return cards
        .slice()
        .sort((prev, next) => next.rating - prev.rating);
    }

    return cards;
  }

  // Установка указанного списка фильмов в указаное место
  _renderCards(currentCards, customTargetElement) {
    const element = customTargetElement ? customTargetElement : this._filmListContainerElement;

    return currentCards.forEach((card) => {
      const movieController = new MovieController(element, this._container, this._onDataChange, this._onViewChange, this._api);
      movieController.render(card);

      if (!customTargetElement) {
        this._showedMainMovieControllers.push(movieController);
      }

      if (!this._showedAllMovieControllers[card.id]) {
        this._showedAllMovieControllers[card.id] = [];
      }

      this._showedAllMovieControllers[card.id].push(movieController);
    });
  }

  // Обновление фильмов
  _updateCards(count) {
    this._removeMainCards();
    this._renderCards(this._movieModel.getItems().slice(0, count));
    this._showingCardsCount = count;
    this._renderShowMoreButton();
  }

  // Удаление фильмов из главного списка
  _removeMainCards() {
    this._showedMainMovieControllers.forEach((movieController) => movieController.destroy());
    this._showedMainMovieControllers = [];
  }

  // Перерендеревание кнопки Show More
  _renderShowMoreButton() {
    remove(this._showMoreButtonComponent);

    if (this._showingCardsCount >= this._movieModel.getItems().length) {
      return;
    }

    this._showMoreButtonComponent.render(this._filmListContainerElement, RenderPosition.AFTEREND);
    this._showMoreButtonComponent.onButtonClick(() => {
      const prevCardsCount = this._showingCardsCount;
      const cards = this._getSortedCards(this._sortTypeMainList);

      this._renderCards(cards.slice(prevCardsCount, this._showingCardsCount + FilmCount.LIST));
      this._showingCardsCount += FilmCount.LIST;

      if (this._showingCardsCount >= cards.length) {
        remove(this._showMoreButtonComponent);
      }
    });
  }

  // Рендер самых популярных фильмов
  _renderTopRated(container, allCards) {
    const contentElements = container.querySelector(`.films-list__container`);
    const uniqueRating = [...new Set(allCards.map((card) => card.rating))];
    const cards = allCards
    .slice()
    .filter((card) => card.rating)
    .sort((prev, next) => uniqueRating.length > 1 ? next.rating - prev.rating : 0.5 - Math.random())
    .slice(0, FilmCount.EXTRA);

    if (cards.length) {
      contentElements.innerHTML = ``;
      this._renderCards(cards, contentElements);
    } else {
      container.remove();
    }
  }

  // Рендер самых комментируемых фильмов
  _renderMostCommented(container, allCards) {
    const contentElements = container.querySelector(`.films-list__container`);
    const uniqueCommentQuantity = [...new Set(allCards.map((card) => card.comments.length))];
    const cards = allCards
    .slice()
    .filter((card) => card.comments.length)
    .sort((prev, next) => uniqueCommentQuantity.length > 1 ? next.comments.length - prev.comments.length : 0.5 - Math.random())
    .slice(0, FilmCount.EXTRA);

    if (cards.length) {
      contentElements.innerHTML = ``;
      this._renderCards(cards, contentElements);
    } else {
      container.remove();
    }
  }

  // Обновление данных фильма
  _onDataChange(oldCard, newCard) {
    return this._api.updateCard(oldCard.id, newCard)
    .then((cardModel) => {
      const isSuccess = this._movieModel.updateItem(oldCard.id, cardModel);

      if (isSuccess) {
        if (this._showedAllMovieControllers[oldCard.id]) {
          this._showedAllMovieControllers[oldCard.id].forEach((movieController) => movieController.render(cardModel));
        }

        this._allCards = this._movieModel.getItems();

        this._renderExtraList();
        this._updateCards(this._showingCardsCount);
      }
    });
  }

  // Установка состояния по умолчанию у всех movieController
  _onViewChange() {
    this._showedAllMovieControllers.forEach((controllers) => {
      controllers.forEach((movieController) => movieController.setDefaultView());
    });
  }

  // Обновление данных после работы с фильтром
  _onFilterChange() {
    this._updateCards(FilmCount.LIST);
  }

  toggleStatistic(isShow = false) {
    if (isShow) {
      this._sortComponent.hide();
      this._mainContentComponent.hide();
      this._statisticComponent.show();
    } else {
      this._statisticComponent.hide();
      this._sortComponent.show();
      this._mainContentComponent.show();
    }
  }
}
