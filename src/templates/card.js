import {getFormatFilmReleaseYear, getRuntimeByMinutes} from '../utils/common.js';

const MAX_DESCRIPTION_LENGTH = 140;

export const getCardTemplate = (card) => {
  const {name, poster, description, releaseDate, rating, runtime, genres, comments} = card;

  return (
    `<article class="film-card">
          <h3 class="film-card__title">${name}</h3>
          <p class="film-card__rating">${rating}</p>
          <p class="film-card__info">
            <span class="film-card__year">${getFormatFilmReleaseYear(releaseDate)}</span>
            <span class="film-card__duration">${getRuntimeByMinutes(runtime)}</span>
            <span class="film-card__genre">${genres.join(`, `)}</span>
          </p>
          <img src="${poster}" alt="${name}" class="film-card__poster">
          <p class="film-card__description">${description.length > MAX_DESCRIPTION_LENGTH ? description.slice(0, MAX_DESCRIPTION_LENGTH - 1) + `...` : description}</p>
          <a class="film-card__comments">${comments.length} comments</a>
          <form class="film-card__controls">
            <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
            <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
            <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
          </form>
        </article>`
  );
};
