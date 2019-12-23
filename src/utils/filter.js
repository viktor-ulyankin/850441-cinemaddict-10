import {FilterType} from "./const";

export const getCardsByFilter = (cards, filterType) => {
  switch (filterType) {
    case FilterType.WATCHLIST:
      return cards.filter((item) => item.isOnWatchList);
    case FilterType.HISTORY:
      return cards.filter((item) => item.isOnWatched);
    case FilterType.FAVORITES:
      return cards.filter((item) => item.isOnFavorites);
  }

  return cards;
};
