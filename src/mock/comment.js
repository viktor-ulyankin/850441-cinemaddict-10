import {getRandomIntegerNumber} from '../utils/common.js';

const comments = [
  {
    emoji: `./images/emoji/smile.png`,
    text: `Interesting setting and a good cast`,
    author: `Tim Macoveev`,
    date: `2019/12/31 23:59`,
  },
  {
    emoji: `./images/emoji/sleeping.png`,
    text: `Booooooooooring`,
    author: `John Doe`,
    date: `2 days ago`,
  },
  {
    emoji: `./images/emoji/puke.png`,
    text: `Very very old. Meh`,
    author: `John Doe`,
    date: `2 days ago`,
  },
  {
    emoji: `./images/emoji/angry.png`,
    text: `Almost two hours? Seriously?`,
    author: `John Doe`,
    date: `Today`,
  },
];

export const getComments = () => {
  return comments
  .slice()
  .sort(() => Math.random() - 0.5)
  .slice(0, getRandomIntegerNumber(0, comments.length));
};
