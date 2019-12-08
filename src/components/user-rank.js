import AbstractComponent from './abstract-component.js';
import {getUserRankTemplate} from '../templates/user-rank.js';

export default class UserRank extends AbstractComponent {
  constructor(rank = 0) {
    super();

    this._rank = rank;
  }

  getTemplate() {
    return getUserRankTemplate(this._rank);
  }
}
