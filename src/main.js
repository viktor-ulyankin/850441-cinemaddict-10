import UserRankComponent from './components/user-rank.js';
import {generateCards} from './mock/card.js';
import {getUserRank} from './mock/user-rank.js';
import PageController from './controllers/page.js';
import {FilmCount, RenderPosition} from './utils/const.js';

const headerElement = document.querySelector(`.header`);
const footerElement = document.querySelector(`.footer`);
const mainElement = document.querySelector(`.main`);

const cards = generateCards(FilmCount.ALL);

// Рендер ранга юзера
const userRankComponent = new UserRankComponent(getUserRank());
userRankComponent.render(headerElement, RenderPosition.BEFOREEND);

// Установка числа всех фильмов в футер
footerElement.querySelector(`.footer__statistics p`).textContent = `${cards.length} movies inside`;

// Отправка данных в контроллер
const pageController = new PageController(mainElement);
pageController.render(cards);
