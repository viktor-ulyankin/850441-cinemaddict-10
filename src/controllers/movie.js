import CardComponent from "../components/card.js";
import {replace, remove} from "../utils/common.js";
import {RenderPosition} from "../utils/const.js";
import MovieComponent from "../components/movie.js";

export default class MovieController {
  constructor(containerForCard, containerForMovie, onDataChange, onViewChange) {
    this._containerForCard = containerForCard;
    this._containerForMovie = containerForMovie;
    this._onDataChange = onDataChange;
    this._cardComponent = null;
    this._onViewChange = onViewChange;
    this._movieComponent = null;
  }

  render(card) {
    const newCard = Object.assign({}, card);

    const toggleWatchList = (isChecked = true) => {
      newCard.isOnWatchList = isChecked;
      this._onDataChange(this, card, newCard);
    };

    const toggleWatched = (isChecked = true) => {
      newCard.isOnWatched = isChecked;
      this._onDataChange(this, card, newCard);
    };

    const toggleFavorites = (isChecked = true) => {
      newCard.isOnFavorites = isChecked;
      this._onDataChange(this, card, newCard);
    };

    const oldCardComponent = this._cardComponent;

    this._cardComponent = new CardComponent(card);

    this._cardComponent.onClick(() => {
      this._onViewChange();

      this._movieComponent = new MovieComponent(card);
      this._movieComponent.render(this._containerForMovie, RenderPosition.AFTEREND);

      this._movieComponent.onClickWatchList = toggleWatchList;

      this._movieComponent.onClickWatched = toggleWatched;

      this._movieComponent.onClickFavorite = toggleFavorites;
    });

    this._cardComponent.onClickWatchList(toggleWatchList);

    this._cardComponent.onClickWatched(toggleWatched);

    this._cardComponent.onClickFavorite(() => {
      toggleFavorites(!newCard.isOnFavorites);
    });

    if (oldCardComponent) {
      replace(this._cardComponent, oldCardComponent);
    } else {
      this._cardComponent.render(this._containerForCard, RenderPosition.BEFOREEND);
    }
  }

  setDefaultView() {
    remove(this._movieComponent);
  }
}
