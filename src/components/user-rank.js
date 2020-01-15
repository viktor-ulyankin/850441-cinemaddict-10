import {getUserRank} from '../utils/common.js';
import AbstractComponent from './abstract-component.js';
import {getUserRankTemplate} from '../templates/user-rank.js';

export default class UserRank extends AbstractComponent {
  constructor(quantity = 0) {
    super();

    this._rank = getUserRank(quantity);
  }

  _getTemplate() {
    return getUserRankTemplate(this._rank);
  }
}
