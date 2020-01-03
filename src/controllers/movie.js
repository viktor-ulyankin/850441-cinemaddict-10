import CardComponent from "../components/card.js";
import {replace, remove} from "../utils/common.js";
import {RenderPosition} from "../utils/const.js";
import MovieComponent from "../components/movie.js";
import CommentsComponent from "../components/comments.js";
import CardModel from '../models/card.js';
import CommentsModel from '../models/comments.js';
import he from 'he';

export default class MovieController {
  constructor(containerForCard, containerForMovie, onDataChange, onViewChange, api) {
    this._containerForCard = containerForCard;
    this._containerForMovie = containerForMovie;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._api = api;
    this._cardComponent = null;
    this._movieComponent = null;
    this._commentComponent = null;
  }

  render(card) {
    const toggleWatchList = (isChecked = true) => {
      const newCard = CardModel.clone(card);

      newCard.isOnWatchList = isChecked;
      this._onDataChange(this, card, newCard);
    };

    const toggleWatched = (isChecked = true) => {
      const newCard = CardModel.clone(card);

      newCard.isOnWatched = isChecked;
      this._onDataChange(this, card, newCard);
    };

    const toggleFavorites = (isChecked = true) => {
      const newCard = CardModel.clone(card);

      newCard.isOnFavorites = isChecked;
      this._onDataChange(this, card, newCard);
    };

    const deleteComment = (numDeletedComment) => {
      this._api.deleteComment(card.comments[numDeletedComment])
      .then(() => {
        const newCard = CardModel.clone(card);

        newCard.comments.splice(numDeletedComment, 1);
        this._onDataChange(this, card, newCard);
      });
    };

    const addComment = (comment, emotion) => {
      const newComment = new CommentsModel({
        author: `Viktor`,
        emotion,
        comment: he.encode(comment),
        date: new Date(),
      });

      return this._api.createComment(card.id, newComment)
      .then((response) => {
        this._onDataChange(this, card, response.movie);
      });
    };

    const oldCardComponent = this._cardComponent;
    const oldMovieComponent = this._movieComponent;

    this._cardComponent = new CardComponent(card);

    this._cardComponent.onClick(() => {
      this._onViewChange();

      this._movieComponent = new MovieComponent();
      this._movieComponent.render(this._containerForMovie, RenderPosition.AFTEREND, card);
      this._movieComponent.onWatchListClick = toggleWatchList;
      this._movieComponent.onWatchedClick = toggleWatched;
      this._movieComponent.onFavoriteClick = toggleFavorites;

      this._api.getComments(card.id)
      .then((comments) => {
        this._commentComponent = new CommentsComponent();
        this._commentComponent.render(this._movieComponent.getElement().querySelector(`.film-details__inner`), RenderPosition.BEFOREEND, comments);
        this._commentComponent.onDeleteClick = deleteComment;
        this._commentComponent.onAdd = addComment;
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

    if (oldMovieComponent) {
      replace(this._movieComponent, oldMovieComponent);
      this._movieComponent.render(this._containerForMovie, RenderPosition.AFTEREND, card);
    }

    if (this._commentComponent) {
      this._api.getComments(card.id)
      .then((comments) => {
        this._commentComponent.render(this._movieComponent.getElement().querySelector(`.film-details__inner`), RenderPosition.BEFOREEND, comments);
        this._commentComponent.onDeleteClick = deleteComment;
        this._commentComponent.onAdd = addComment;
      });
    }
  }

  setDefaultView() {
    remove(this._movieComponent);
  }

  destroy() {
    remove(this._cardComponent);
  }
}
