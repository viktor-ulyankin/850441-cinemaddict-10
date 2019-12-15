import {getRandomIntegerNumber, getRandomDate, formatCommentDate} from '../utils/common.js';

const generateDate = () => {
  let date = new Date();
  date.setDate(date.getDate() - 3);
  date = getRandomDate(date, new Date());
  return formatCommentDate(date);
};

const comments = [
  {
    emoji: `./images/emoji/smile.png`,
    text: `Interesting setting and a good cast`,
    author: `Tim Macoveev`,
    date: generateDate(),
  },
  {
    emoji: `./images/emoji/sleeping.png`,
    text: `Booooooooooring`,
    author: `John Doe`,
    date: generateDate(),
  },
  {
    emoji: `./images/emoji/puke.png`,
    text: `Very very old. Meh`,
    author: `John Doe`,
    date: generateDate(),
  },
  {
    emoji: `./images/emoji/angry.png`,
    text: `Almost two hours? Seriously?`,
    author: `John Doe`,
    date: generateDate(),
  },
];

export const getComments = () => {
  return comments
  .slice()
  .sort(() => Math.random() - 0.5)
  .slice(0, getRandomIntegerNumber(0, comments.length));
};
