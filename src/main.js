import {FilmCount, RenderPosition} from './utils/const.js';
import {generateCards} from './mock/card.js';
import {getUserRank} from './mock/user.js';
import MovieModel from './models/movies.js';
import UserRankComponent from './components/user-rank.js';
import PageController from './controllers/page.js';
import FilterController from './controllers/filter.js';

const headerElement = document.querySelector(`.header`);
const footerElement = document.querySelector(`.footer`);
const mainElement = document.querySelector(`.main`);

const cards = generateCards(FilmCount.ALL);
const userRank = getUserRank();
const movieModel = new MovieModel();
movieModel.setItems(cards);
const filterController = new FilterController(mainElement, movieModel);
const pageController = new PageController(mainElement, movieModel, userRank);

// Рендер ранга юзера
const userRankComponent = new UserRankComponent(userRank);
userRankComponent.render(headerElement, RenderPosition.BEFOREEND);

// Установка числа всех фильмов в футер
footerElement.querySelector(`.footer__statistics p`).textContent = `${cards.length} movies inside`;

// Рендер контроллера фильтра
filterController.render();
filterController.onItemClick = (itemName) => pageController.toggleStatistic(itemName === `stats`);

// Рендер контроллера страницы
pageController.render();
