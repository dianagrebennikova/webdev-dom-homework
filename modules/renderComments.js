import { comments } from "./commentsArr.js";
import { sanitizeHTML } from "./sanitize.js";
import { addLikeListeners } from "./addLikeListener.js";
import { addReplyListeners } from "./addReplyListener.js";
import { getCurrentFormattedDate } from "./getDate.js";

export function renderComments() {
  const commentsList = document.querySelector(".comments");
  commentsList.innerHTML = "";

  comments.forEach((comment, index) => {
    commentsList.innerHTML += `
      <li class="comment" data-index="${index}">
        <div class="comment-header">
          <div>${comment.author.name}</div>
          <div>${getCurrentFormattedDate(comment.date)}</div>
        </div>
        <div class="comment-body">
          <div class="comment-text">${sanitizeHTML(comment.text)}</div>
        </div>
        <div class="comment-footer">
          <div class="likes">
            <span class="likes-counter">${comment.likes}</span>
        <button class="like-button ${
          comment.isLiked ? "-active-like" : ""
        } ${comment.isLikeLoading ? "-loading-like" : ""}" data-index="${index}">
        </button>
          </div>
        </div>
      </li>`;
  });

  addLikeListeners();
  addReplyListeners();
}
