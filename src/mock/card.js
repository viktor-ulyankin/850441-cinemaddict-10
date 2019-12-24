import {getRandomIntegerNumber, getRandomDate} from '../utils/common.js';
import {getComments} from './comment.js';

const SEPARATOR_TEXT = `. `;
const FIRST_YEAR_RELEASE = 1930;
const RuntimeMinute = {
  MIN: 75,
  MAX: 180,
};

const Rating = {
  MIN: 1,
  MAX: 9,
};

const Names = [
  `Три билборда`,
  `Сияние`,
  `Американская история X`,
  `Космическая одиссея`,
  `Матрица`,
  `12 обезьян`,
  `Завтрак нагишом`,
  `Оно 2`,
  `Иван Васильевич меняет профессию`,
  `Лето`,
  `Богемская рапсодия`,
  `Криминальное чтиво`,
  `Интерстеллар`,
  `Одержимость`,
  `Шоу Трумэна`,
];

const Posters = [
  `./images/posters/made-for-each-other.png`,
  `./images/posters/popeye-meets-sinbad.png`,
  `./images/posters/sagebrush-trail.jpg`,
  `./images/posters/santa-claus-conquers-the-martians.jpg`,
  `./images/posters/the-dance-of-life.jpg`,
  `./images/posters/the-great-flamarion.jpg`,
  `./images/posters/the-man-with-the-golden-arm.jpg`,
];

const TextForDescriptions = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;

const Genres = [
  `Drama`,
  `Film-Noir`,
  `Mystery`,
];

const getRandomArrayItem = (array) => array[getRandomIntegerNumber(0, array.length - 1)];

const generateDescription = () => {
  return TextForDescriptions
  .split(SEPARATOR_TEXT)
  .sort(() => Math.random() - 0.5)
  .slice(0, 2 + Math.round(Math.random()))
  .join(SEPARATOR_TEXT);
};

const generateReleaseDate = () => getRandomDate(new Date(FIRST_YEAR_RELEASE, 0, 1), new Date());

const generateGenre = () => {
  const genres = Genres
  .slice()
  .filter(() => Math.random() > 0.5)
  .sort(() => (Math.random() - 0.5));

  return genres.length ? genres : [Genres[getRandomIntegerNumber(0, Genres.length - 1)]];
};

const generateCard = (id) => {
  return {
    id,
    name: getRandomArrayItem(Names),
    poster: getRandomArrayItem(Posters),
    description: generateDescription(),
    releaseDate: generateReleaseDate(),
    rating: getRandomIntegerNumber(Rating.MIN * 10, Rating.MAX * 10) / 10,
    runtime: getRandomIntegerNumber(RuntimeMinute.MIN, RuntimeMinute.MAX),
    genres: generateGenre(),
    comments: getComments(),
    isOnWatchList: Math.random() > 0.5,
    isOnWatched: Math.random() > 0.5,
    isOnFavorites: Math.random() > 0.5,
    director: `Anthony Mann`,
    writers: `Anne Wigton, Heinz Herald, Richard Weil`,
    actors: `Erich von Stroheim, Mary Beth Hughes, Dan Duryea`,
    country: `USA`,
  };
};

let counterCard = 0;

const generateCards = (count) => {
  return new Array(count)
  .fill(``)
  .map(() => generateCard(++counterCard));
};

export {generateCards};
