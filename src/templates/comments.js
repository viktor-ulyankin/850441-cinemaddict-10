import {formatCommentDate} from "../utils/common.js";
import {Emotion} from "../utils/const.js";

export const getCommentsTemplate = (comments) => {
  return (
    `<div class="form-details__bottom-container">
      <section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>

        <ul class="film-details__comments-list">
            ${getItemsTemplate(comments)}
        </ul>

        <div class="film-details__new-comment">
          <div for="add-emoji" class="film-details__add-emoji-label"></div>

          <label class="film-details__comment-label">
            <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
          </label>

          <div class="film-details__emoji-list">
            ${getEmotionList()}
          </div>
        </div>
      </section>
      <style>
      @keyframes shake {
        0%,
        100% {
          transform: translateX(0);
        }
    
        10%,
        30%,
        50%,
        70%,
        90% {
          transform: translateX(-5px);
        }
    
        20%,
        40%,
        60%,
        80% {
          transform: translateX(5px);
        }
      }
      .film-details__new-comment_error {
        animation: shake 0.6s;
      }
      .film-details__new-comment_error .film-details__comment-input {
        border: 1px solid red;
      }
    </style>
    </div>`
  );
};

const getItemsTemplate = (comments) => {
  return comments
  .map((comment) => {
    return (`<li class="film-details__comment">
            <span class="film-details__comment-emoji">
              <img src="./images/emoji/${comment.emotion}.png" width="55" height="55" alt="emoji">
            </span>
            <div>
              <p class="film-details__comment-text">${comment.comment}</p>
              <p class="film-details__comment-info">
                <span class="film-details__comment-author">${comment.author}</span>
                <span class="film-details__comment-day">${formatCommentDate(comment.date)}</span>
                <button class="film-details__comment-delete">Delete</button>
              </p>
            </div>
          </li>`
    );
  })
  .join(`\n`);
};

const getEmotionList = () => {
  let template = ``;

  Emotion.forEach((emotion) => {
    template += `<input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${emotion}" value="${emotion}">
            <label class="film-details__emoji-label" for="emoji-${emotion}">
              <img src="./images/emoji/${emotion}.png" width="30" height="30" alt="emoji">
            </label>`;
  });

  return template;
};
