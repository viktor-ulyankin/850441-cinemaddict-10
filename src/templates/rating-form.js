export const getRatingFormTemplate = (card) => {
  return (`<div class="form-details__middle-container">
      <section class="film-details__user-rating-wrap">
        <div class="film-details__user-rating-controls">
          <button class="film-details__watched-reset" type="button">Undo</button>
        </div>

        <div class="film-details__user-score">
          <div class="film-details__user-rating-poster">
            <img src="${card.poster}" alt="film-poster" class="film-details__user-rating-img">
          </div>

          <section class="film-details__user-rating-inner">
            <h3 class="film-details__user-rating-title">${card.name}</h3>

            <p class="film-details__user-rating-feelings">How you feel it?</p>

            <div class="film-details__user-rating-score">
              ${getItemsFormTemplate(card)}
            </div>
          </section>
        </div>
      </section>
    </div>`);
};

const getItemsFormTemplate = (card) => {
  return Array(9).fill(0).map((item, index) => {
    const value = index + 1;

    return (`<input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="${value}" id="rating-${value}" ${card.personalRating === value ? ` checked` : ``}>
              <label class="film-details__user-rating-label" for="rating-${value}">${value}</label>`);
  })
  .join(`\n`);
};
