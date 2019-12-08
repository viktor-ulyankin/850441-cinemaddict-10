import CardComponent from '../components/card.js';
import DetailComponent from '../components/detail.js';
import FilterComponent from '../components/filter.js';
import MainContentComponent from '../components/main-content.js';
import ShowMoreButtonComponent from '../components/show-more-button.js';
import {render, remove} from '../utils/render.js';
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
    render(this.container, new FilterComponent(watchListFilmsQuantity(), historyFilmsQuantity(), favoritesFilmsQuantity()), RenderPosition.BEFOREEND);

    // Рендер контейнеров для списков фильмов
    render(this.container, new MainContentComponent(cards.length), RenderPosition.BEFOREEND);

    // Установка указанного списка фильмов в указаное место
    const setList = (currentCards, targetElement) => currentCards.forEach((card) => {
      const cardElement = new CardComponent(card);

      render(targetElement, cardElement, RenderPosition.BEFOREEND);

      cardElement.setClickHandler(() => {
        const detailComponent = new DetailComponent(card);

        render(this.container, detailComponent, RenderPosition.AFTEREND);

        detailComponent.setCloseBtnClickHandler(() => remove(detailComponent));

        document.addEventListener(`keydown`, function (evt) {
          const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

          if (isEscKey) {
            remove(detailComponent);
          }
        });
      });
    });

    // Рендер начального состояния главного списка фильмов
    let showingCardsCount = FilmCount.LIST;
    const filmListContainerElement = this.container.querySelector(`.films-list .films-list__container`);
    setList(cards.slice(0, showingCardsCount), filmListContainerElement);

    // Рендер кнопки "Show more"
    const showMoreButtonComponent = new ShowMoreButtonComponent();
    render(filmListContainerElement, showMoreButtonComponent, RenderPosition.AFTEREND);
    showMoreButtonComponent.setClickHandler(() => {
      const prevTasksCount = showingCardsCount;
      showingCardsCount += FilmCount.LIST;

      setList(cards.slice(prevTasksCount, showingCardsCount), filmListContainerElement);

      if (showingCardsCount >= cards.length) {
        remove(showMoreButtonComponent);
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
