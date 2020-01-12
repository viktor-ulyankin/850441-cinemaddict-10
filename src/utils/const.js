export const FilmCount = {
  LIST: 5,
  EXTRA: 2,
};

export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
  AFTEREND: `afterend`,
};

export const SortType = {
  DATE: `date`,
  RATING: `rating`,
  DEFAULT: `default`,
};

export const FilterType = {
  ALL: `all`,
  WATCHLIST: `watchlist`,
  HISTORY: `history`,
  FAVORITES: `favorites`,
};

export const Emotion = new Set([
  `smile`,
  `sleeping`,
  `puke`,
  `angry`,
]);

export const StatisticFilterType = {
  ALL: {
    name: `all-time`,
    text: `All time`,
  },
  TODAY: {
    name: `today`,
    text: `Today`,
  },
  WEEK: {
    name: `week`,
    text: `Week`,
  },
  MONTH: {
    name: `month`,
    text: `Month`,
  },
  YEAR: {
    name: `year`,
    text: `Year`,
  },
};
