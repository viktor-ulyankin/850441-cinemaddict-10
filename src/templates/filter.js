import {FilterType} from "../utils/const.js";

export const getFilterTemplate = (filters) => {
  const getFilterItemsTemplate = () => {
    return filters.map((filter, index) => {
      let title = `All movies`;

      switch (filter.name) {
        case FilterType.WATCHLIST:
          title = `Watchlist`;
          break;
        case FilterType.WATCHED:
          title = `History`;
          break;
        case FilterType.FAVORITE:
          title = `Favorites`;
          break;
      }

      return `<a href="#${filter.name}" class="main-navigation__item${filter.isActive ? ` main-navigation__item--active` : ``}">${title}${index ? ` <span class="main-navigation__item-count">${filter.count}</span>` : ``}</a>`;
    })
    .join(`\n`) + `<a href="#stats" class="main-navigation__item main-navigation__item--additional">Stats</a>`;
  };

  return (
    `<nav class="main-navigation">
    ${getFilterItemsTemplate()}
  </nav>`
  );
};
