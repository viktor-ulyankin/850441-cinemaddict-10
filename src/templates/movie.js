import {formatFilmReleaseDate, getRuntimeByMinutes} from '../utils/common.js';


export const getMovieTemplate = (card) => {
  const getGenresTemplate = (genres) => {
    return genres
    .map((genre) => `<span class="film-details__genre">${genre}</span>`)
    .join(`\n`);
  };

  return (
    `<section class="film-details">
  <form class="film-details__inner" action="" method="get">
    <div class="form-details__top-container">
      <div class="film-details__close">
        <button class="film-details__close-btn" type="button">close</button>
      </div>
      <div class="film-details__info-wrap">
        <div class="film-details__poster">
          <img class="film-details__poster-img" src="${card.poster}" alt="${card.name}">

          <p class="film-details__age">${card.ageRating}+</p>
        </div>

        <div class="film-details__info">
          <div class="film-details__info-head">
            <div class="film-details__title-wrap">
              <h3 class="film-details__title">${card.name}</h3>
              <p class="film-details__title-original">Original: ${card.name2}</p>
            </div>

            <div class="film-details__rating">
              <p class="film-details__total-rating">${card.rating}</p>
            </div>
          </div>

          <table class="film-details__table">
            <tr class="film-details__row">
              <td class="film-details__term">Director</td>
              <td class="film-details__cell">${card.director}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Writers</td>
              <td class="film-details__cell">${card.writers.join(`, `)}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Actors</td>
              <td class="film-details__cell">${card.actors.join(`, `)}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Release Date</td>
              <td class="film-details__cell">${formatFilmReleaseDate(card.releaseDate)}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Runtime</td>
              <td class="film-details__cell">${getRuntimeByMinutes(card.runtime)}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Country</td>
              <td class="film-details__cell">${card.country}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">${card.genres.length > 1 ? `Genres` : `Genre`}</td>
              <td class="film-details__cell">
                ${getGenresTemplate(card.genres)}
              </td>
            </tr>
          </table>

          <p class="film-details__film-description">
            ${card.description}
          </p>
        </div>
      </div>

      <section class="film-details__controls">
        <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist"${card.isOnWatchList ? ` checked` : ``}>
        <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

        <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched"${card.isOnWatched ? ` checked` : ``}>
        <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

        <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite"${card.isOnFavorites ? ` checked` : ``}>
        <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
      </section>
    </div>
  </form>
  <style>
      @keyframes shake {
        0%,
        100% {
          transform: translateX(0);
        }
    
        10%,
        30%,
        50%,
        70%,
        90% {
          transform: translateX(-5px);
        }
    
        20%,
        40%,
        60%,
        80% {
          transform: translateX(5px);
        }
      }
      .film-details__new-comment_error, .film-details__user-rating-score_error {
        animation: shake 0.6s;
      }
      .film-details__new-comment_error .film-details__comment-input {
        border: 1px solid red;
      }
      .film-details__user-rating-score_error {
        background-color: red;
      }
    </style>
</section>`
  );
};
