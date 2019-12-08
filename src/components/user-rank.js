import AbstractComponent from './abstract-component.js';

export const getUserRankTemplate = (rank) => {
  return (
    `<section class="header__profile profile">
    <p class="profile__rating">${rank}</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`
  );
};

export default class UserRank extends AbstractComponent {
  constructor(rank = 0) {
    super();

    this._rank = rank;
  }

  getTemplate() {
    return getUserRankTemplate(this._rank);
  }
}
