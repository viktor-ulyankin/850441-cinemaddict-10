import API from './api.js';
import {RenderPosition} from './utils/const.js';
import MovieModel from './models/movies.js';
import UserRankComponent from './components/user-rank.js';
import PageController from './controllers/page.js';
import FilterController from './controllers/filter.js';

const USER_RANK = `Viktor`;
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

  const filterController = new FilterController(mainElement, movieModel);
  const pageController = new PageController(mainElement, movieModel, USER_RANK, api);

  // Рендер ранга юзера
  const userRankComponent = new UserRankComponent(USER_RANK);
  userRankComponent.render(headerElement, RenderPosition.BEFOREEND);

  // Установка числа всех фильмов в футер
  footerElement.querySelector(`.footer__statistics p`).textContent = `${cards.length} movies inside`;

  // Рендер контроллера фильтра
  filterController.onItemClick((itemName) => pageController.toggleStatistic(itemName === `stats`));
  filterController.render();

  // Рендер основного контроллера страницы
  pageController.render();
});
