import {getRandomIntegerNumber} from '../utils.js';
import {getComments} from './comment.js';

const SEPARATOR_TEXT = `. `;
const FIRST_YEAR_RELEASE = 1930;
const RuntimeMinute = {
  MIN: 75,
  MAX: 180,
};
const Rating = {
  MIN: 0,
  MAX: 10,
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

const generateReleaseDate = () => {
  const start = new Date(FIRST_YEAR_RELEASE, 0, 1);
  const end = new Date();

  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

const generateRantime = () => {
  const minutes = getRandomIntegerNumber(RuntimeMinute.MIN, RuntimeMinute.MAX);

  return `${minutes / 60 ^ 0}h ${minutes % 60}m`;
};

const generateGenre = () => {
  return Genres
  .slice()
  .filter(() => Math.random() > 0.5)
  .sort(() => (Math.random() - 0.5));
};

const generateCard = () => {
  return {
    name: getRandomArrayItem(Names),
    poster: getRandomArrayItem(Posters),
    description: generateDescription(),
    releaseDate: generateReleaseDate(),
    rating: getRandomIntegerNumber(Rating.MIN * 10, Rating.MAX * 10) / 10,
    runtime: generateRantime(),
    genres: generateGenre(),
    comments: getComments(),
    isOnWatchList: Math.random() > 0.5,
    isOnHistory: Math.random() > 0.5,
    isOnFavorites: Math.random() > 0.5,
    director: `Anthony Mann`,
    writers: `Anne Wigton, Heinz Herald, Richard Weil`,
    actors: `Erich von Stroheim, Mary Beth Hughes, Dan Duryea`,
    country: `USA`,
  };
};

const generateCards = (count) => {
  return new Array(count)
  .fill(``)
  .map(generateCard);
};

export {generateCards};
