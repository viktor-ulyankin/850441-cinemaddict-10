import CardComponent from "../components/card.js";
import {replace, remove} from "../utils/common.js";
import {RenderPosition} from "../utils/const.js";
import MovieComponent from "../components/movie.js";
import CommentsComponent from "../components/comments.js";
import RatingFormComponent from "../components/rating-form.js";
import CardModel from '../models/card.js';
import CommentsModel from '../models/comments.js';
import he from 'he';

export default class MovieController {
  constructor(containerForCard, containerForMovie, onDataChange, onViewChange, api) {
    this._card = null;
    this._containerForCard = containerForCard;
    this._containerForMovie = containerForMovie;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._api = api;
    this._cardComponent = null;
    this._movieComponent = null;
    this._commentComponent = null;
    this._ratingFormComponent = null;
  }

  render(card) {
    this._card = card;

    const toggleWatchList = (isChecked) => {
      const newCard = CardModel.clone(this._card);

      if (isChecked === undefined) {
        newCard.isOnWatchList = !newCard.isOnWatchList;
      } else {
        newCard.isOnWatchList = isChecked;
      }

      this._onDataChange(this._card, newCard);
    };

    const toggleWatched = (isChecked) => {
      const newCard = CardModel.clone(this._card);

      if (isChecked === undefined) {
        newCard.isOnWatched = !(newCard.isOnWatched);
      } else {
        newCard.isOnWatched = isChecked;
      }

      if (newCard.isOnWatched) {
        newCard.watchingDate = new Date();
      }

      this._onDataChange(this._card, newCard);
    };

    const toggleFavorites = (isChecked) => {
      const newCard = CardModel.clone(this._card);

      if (isChecked === undefined) {
        newCard.isOnFavorites = !newCard.isOnFavorites;
      } else {
        newCard.isOnFavorites = isChecked;
      }

      this._onDataChange(this._card, newCard);
    };

    const deleteComment = (numDeletedComment) => {
      this._api.deleteComment(this._card.comments[numDeletedComment])
      .then(() => {
        const newCard = CardModel.clone(this._card);

        newCard.comments.splice(numDeletedComment, 1);
        this._onDataChange(this._card, newCard);
      });
    };

    const addComment = (comment, emotion) => {
      const newComment = new CommentsModel({
        emotion,
        comment: he.encode(comment),
        date: new Date(),
      });

      return this._api.createComment(this._card.id, newComment)
      .then((response) => {
        this._onDataChange(this._card, response.movie);
      });
    };

    const setRating = (rating) => {
      const newCard = CardModel.clone(this._card);

      newCard.personalRating = rating;

      return this._onDataChange(this._card, newCard);
    };

    const movieComponentClose = () => {
      remove(this._commentComponent);
      remove(this._ratingFormComponent);
    };

    const oldCardComponent = this._cardComponent;
    const oldMovieComponent = this._movieComponent;

    this._cardComponent = new CardComponent(this._card);

    this._cardComponent.onClick(() => {
      this._onViewChange();

      this._movieComponent = new MovieComponent();
      this._movieComponent.onClose(movieComponentClose);
      this._movieComponent.onWatchListClick(toggleWatchList);
      this._movieComponent.onWatchedClick(toggleWatched);
      this._movieComponent.onFavoriteClick(toggleFavorites);
      this._movieComponent.render(this._containerForMovie, RenderPosition.AFTEREND, this._card);

      this._ratingFormComponent = new RatingFormComponent();
      this._ratingFormComponent.render(this._card, this._movieComponent.getElement().querySelector(`.film-details__inner`), RenderPosition.BEFOREEND);
      this._ratingFormComponent.onRatingClick(setRating);

      if (this._card.isOnWatched) {
        this._ratingFormComponent.show();
      } else {
        this._ratingFormComponent.hide();
      }

      this._api.getComments(this._card.id)
      .then((comments) => {
        this._commentComponent = new CommentsComponent();
        this._commentComponent.render(this._movieComponent.getElement().querySelector(`.film-details__inner`), RenderPosition.BEFOREEND, comments);
        this._commentComponent.onDeleteClick(deleteComment);
        this._commentComponent.onEnter(addComment);
      });
    });

    this._cardComponent.onWatchListClick(toggleWatchList);
    this._cardComponent.onWatchedClick(toggleWatched);
    this._cardComponent.onFavoriteClick(toggleFavorites);

    if (oldCardComponent) {
      replace(this._cardComponent, oldCardComponent);
    } else {
      this._cardComponent.render(this._containerForCard, RenderPosition.BEFOREEND);
    }

    if (oldMovieComponent && oldMovieComponent._element) {
      replace(this._movieComponent, oldMovieComponent);
      this._movieComponent.render(this._containerForMovie, RenderPosition.AFTEREND, this._card);
    }

    if (this._commentComponent) {
      this._api.getComments(this._card.id)
      .then((comments) => {
        this._commentComponent.render(this._movieComponent.getElement().querySelector(`.film-details__inner`), RenderPosition.BEFOREEND, comments);
        this._commentComponent.onDeleteClick(deleteComment);
        this._commentComponent.onEnter(addComment);
      });
    }

    if (this._ratingFormComponent) {
      this._ratingFormComponent.render(this._card, this._movieComponent.getElement().querySelector(`.film-details__inner`), RenderPosition.BEFOREEND);

      if (this._card.isOnWatched) {
        this._ratingFormComponent.show();
      } else {
        this._ratingFormComponent.hide();
      }
    }
  }

  setDefaultView() {
    remove(this._movieComponent);
  }

  destroy() {
    remove(this._cardComponent);
  }
}
