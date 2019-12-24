export const getFilterTemplate = (filters) => {
  const getFilterItemsTemplate = () => {
    return filters.map((filter, index) => {
      let title = filter.name[0].toUpperCase() + filter.name.slice(1);

      if (!index) {
        title += ` movies`;
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
