import AbstractComponent from './abstract-component.js';

const getCardTemplate = (card) => {
  const {name, poster, description, releaseDate, rating, runtime, genres, comments} = card;

  const year = releaseDate.getFullYear();

  return (
    `<article class="film-card">
          <h3 class="film-card__title">${name}</h3>
          <p class="film-card__rating">${rating}</p>
          <p class="film-card__info">
            <span class="film-card__year">${year}</span>
            <span class="film-card__duration">${runtime}</span>
            <span class="film-card__genre">${genres[0]}</span>
          </p>
          <img src="${poster}" alt="${name}" class="film-card__poster">
          <p class="film-card__description">${description}</p>
          <a class="film-card__comments">${comments.length} comments</a>
          <form class="film-card__controls">
            <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
            <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
            <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
          </form>
        </article>`
  );
};

export default class Card extends AbstractComponent {
  constructor(card = null) {
    super();

    this._card = card;
  }

  getTemplate() {
    return getCardTemplate(this._card);
  }

  setClickHandler(handler) {
    const cardClickElements = this.getElement().querySelectorAll(`.film-card__poster, .film-card__title, .film-card__comments`);

    for (let i = 0; i < cardClickElements.length; i++) {
      cardClickElements[i].addEventListener(`click`, handler);
    }
  }
}
