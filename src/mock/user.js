import {getRandomIntegerNumber} from '../utils/common.js';

export const getUserRank = () => getRandomIntegerNumber(0, 100);

const users = [
  `Tom`,
  `Jerry`,
  `John`,
  `Victor`,
  `Adel`,
];

export const getUserName = () => users[getRandomIntegerNumber(0, users.length)];
