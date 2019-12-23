import UserRankComponent from './components/user-rank.js';
import MovieModel from './models/movies.js';
import {generateCards} from './mock/card.js';
import {getUserRank} from './mock/user.js';
import PageController from './controllers/page.js';
import FilterController from './controllers/filter.js';
import {FilmCount, RenderPosition} from './utils/const.js';

const headerElement = document.querySelector(`.header`);
const footerElement = document.querySelector(`.footer`);
const mainElement = document.querySelector(`.main`);

const cards = generateCards(FilmCount.ALL);
const movieModel = new MovieModel();
movieModel.setItems(cards);


// Рендер ранга юзера

const userRankComponent = new UserRankComponent(getUserRank());
userRankComponent.render(headerElement, RenderPosition.BEFOREEND);


// Установка числа всех фильмов в футер

footerElement.querySelector(`.footer__statistics p`).textContent = `${cards.length} movies inside`;


// Отправка данных в контроллеры

const filterController = new FilterController(mainElement, movieModel);
filterController.render();

const pageController = new PageController(mainElement, movieModel);
pageController.render();
