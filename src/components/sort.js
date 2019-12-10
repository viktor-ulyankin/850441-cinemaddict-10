import AbstractComponent from './abstract-component.js';
import {getSortTemplate} from '../templates/sort.js';

export default class Sort extends AbstractComponent {
  getTemplate() {
    return getSortTemplate();
  }
}
