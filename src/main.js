import API from './api.js';
import {RenderPosition, FilterType} from './utils/const.js';
import {getCardsByFilter} from "./utils/filter.js";
import MovieModel from './models/movies.js';
import UserRankComponent from './components/user-rank.js';
import PageController from './controllers/page.js';
import FilterController from './controllers/filter.js';

const AUTHORIZATION = `Basic eo0w590ik29889a`;
const END_POINT = `https://htmlacademy-es-10.appspot.com/cinemaddict`;

const api = new API(END_POINT, AUTHORIZATION);
const movieModel = new MovieModel();

const headerElement = document.querySelector(`.header`);
const footerElement = document.querySelector(`.footer`);
const mainElement = document.querySelector(`.main`);

api.getCards()
.then((cards) => {
  movieModel.setItems(cards);

  mainElement.querySelector(`.films`).remove();

  const quantityWatchedMovie = getCardsByFilter(cards, FilterType.HISTORY).length;
  const filterController = new FilterController(mainElement, movieModel);
  const pageController = new PageController(mainElement, movieModel, quantityWatchedMovie, api);

  // Рендер ранга юзера
  const userRankComponent = new UserRankComponent(quantityWatchedMovie);
  userRankComponent.render(headerElement, RenderPosition.BEFOREEND);

  // Установка числа всех фильмов в футер
  footerElement.querySelector(`.footer__statistics p`).textContent = `${cards.length} movies inside`;

  // Рендер контроллера фильтра
  filterController.onItemClick((itemName) => pageController.toggleStatistic(itemName === `stats`));
  filterController.render();

  // Рендер основного контроллера страницы
  pageController.render();
});
