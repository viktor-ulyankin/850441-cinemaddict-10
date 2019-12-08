import {createElement} from "../utils";

const getMainContentTemplate = (cardQuantity) => {
  let allFilmsContent = `<h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>

      <div class="films-list__container">
        
      </div>`;

  if (!cardQuantity) {
    allFilmsContent = `<h2 class="films-list__title">There are no movies in our database</h2>`;
  }

  return (
    `<section class="films">
    <section class="films-list">
      ${allFilmsContent}
    </section>

    <section class="films-list--extra">
      <h2 class="films-list__title">Top rated</h2>

      <div class="films-list__container">
        
      </div>
    </section>

    <section class="films-list--extra">
      <h2 class="films-list__title">Most commented</h2>

      <div class="films-list__container">
        
      </div>
    </section>
  </section>`
  );
};

export default class MainContent {
  constructor(cardQuantity = 0) {
    this._element = null;
    this._cardQuantity = cardQuantity;
  }

  getTemplate() {
    return getMainContentTemplate(this._cardQuantity);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
