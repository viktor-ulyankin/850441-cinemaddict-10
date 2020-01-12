export default class Card {
  constructor(data) {
    this.id = data[`id`];
    this.name = data[`film_info`][`title`] || ``;
    this.name2 = data[`film_info`][`alternative_title`] || ``;
    this.poster = data[`film_info`][`poster`] || ``;
    this.description = data[`film_info`][`description`] || ``;
    this.releaseDate = data[`film_info`][`release`][`date`] ? new Date(data[`film_info`][`release`][`date`]) : null;
    this.rating = data[`film_info`][`total_rating`] || 0;
    this.ageRating = data[`film_info`][`age_rating`] || 0;
    this.personalRating = data[`user_details`][`personal_rating`] || 0;
    this.runtime = data[`film_info`][`runtime`] || 0;
    this.genres = data[`film_info`][`genre`] || [];
    this.comments = data[`comments`] || [];
    this.isOnWatchList = Boolean(data[`user_details`][`watchlist`]);
    this.isOnWatched = Boolean(data[`user_details`][`already_watched`]);
    this.isOnFavorites = Boolean(data[`user_details`][`favorite`]);
    this.watchingDate = data[`user_details`][`watching_date`] ? new Date(data[`user_details`][`watching_date`]) : null;
    this.director = data[`film_info`][`director`] || ``;
    this.writers = data[`film_info`][`writers`] || [];
    this.actors = data[`film_info`][`actors`] || [];
    this.country = data[`film_info`][`release`][`release_country`] || ``;
  }

  toRAW() {
    return {
      'id': this.id,
      'film_info': {
        'title': this.name,
        'alternative_title': this.name2,
        'total_rating': this.rating,
        'poster': this.poster,
        'age_rating': this.ageRating,
        'director': this.director,
        'writers': this.writers,
        'actors': this.actors,
        'release': {
          'date': this.releaseDate ? this.releaseDate.toISOString() : null,
          'release_country': this.country,
        },
        'runtime': this.runtime,
        'genre': this.genres,
        'description': this.description,
      },
      'user_details': {
        'personal_rating': Number(this.personalRating),
        'watchlist': this.isOnWatchList,
        'already_watched': this.isOnWatched,
        'watching_date': this.watchingDate ? this.watchingDate.toISOString() : null,
        'favorite': this.isOnFavorites,
      },
      'comments': this.comments,
    };
  }

  static parseCard(data) {
    return new Card(data);
  }

  static parseCards(data) {
    return data.map(Card.parseCard);
  }

  static clone(data) {
    return new Card(data.toRAW());
  }
}
