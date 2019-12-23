import {SortType} from '../utils/const.js';

const getSortItemsTemplate = () => {
  return Object.values(SortType).map((sortName, index, currentArray) => {
    return `<li><a href="#" data-sort-type="${sortName}" class="sort__button${index === currentArray.length - 1 ? ` sort__button--active` : ``}">Sort by ${sortName}</a></li>`;
  })
  .reverse()
  .join(`\n`);
};

export const getSortTemplate = () => {
  return (
    `<ul class="sort">
    ${getSortItemsTemplate()}
  </ul>`
  );
};
