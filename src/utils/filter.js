import {FilterType} from "./const.js";

export const getCardsByFilter = (cards, filterType) => {
  switch (filterType) {
    case FilterType.WATCHLIST:
      return cards.filter((item) => item.isOnWatchList);
    case FilterType.WATCHED:
      return cards.filter((item) => item.isOnWatched);
    case FilterType.FAVORITE:
      return cards.filter((item) => item.isOnFavorites);
  }

  return cards;
};
