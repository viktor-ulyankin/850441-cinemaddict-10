import CardModel from './models/card.js';
import CommentsModel from './models/comments.js';

const Method = {
  GET: `GET`,
  POST: `POST`,
  PUT: `PUT`,
  DELETE: `DELETE`,
};

const ResponseStatus = {
  SUCCESS_MIN: 200,
  SUCCESS_MAX: 300,
};

export default class API {
  constructor(endPoint, authorization) {
    this._endPoint = endPoint;
    this._authorization = authorization;
  }

  getCards() {
    return this._load({url: `movies`})
    .then((response) => response.json())
    .then(CardModel.parseCards);
  }

  createComment(movieId, comment) {
    return this._load({
      url: `comments/${movieId}`,
      method: Method.POST,
      body: JSON.stringify(comment.toRAW()),
      headers: new Headers({'Content-Type': `application/json`})
    })
    .then((response) => response.json())
    .then((response) => ({
      movie: CardModel.parseCard(response.movie),
      comments: CommentsModel.parseComments(response.comments),
    }));
  }

  updateCard(id, data) {
    return this._load({
      url: `movies/${id}`,
      method: Method.PUT,
      body: JSON.stringify(data.toRAW()),
      headers: new Headers({'Content-Type': `application/json`})
    })
    .then((response) => response.json())
    .then(CardModel.parseCard);
  }

  deleteComment(id) {
    return this._load({url: `comments/${id}`, method: Method.DELETE});
  }

  getComments(movieID) {
    return this._load({url: `comments/${movieID}`})
    .then((response) => response.json())
    .then(CommentsModel.parseComments);
  }

  _checkStatus(response) {
    if (response.status >= ResponseStatus.SUCCESS_MIN && response.status < ResponseStatus.SUCCESS_MAX) {
      return response;
    } else {
      throw new Error(`${response.status}: ${response.statusText}`);
    }
  }

  _load({url, method = Method.GET, body = null, headers = new Headers()}) {
    headers.append(`Authorization`, this._authorization);

    return fetch(`${this._endPoint}/${url}`, {method, body, headers})
    .then(this._checkStatus)
    .catch((err) => {
      throw err;
    });
  }
}
