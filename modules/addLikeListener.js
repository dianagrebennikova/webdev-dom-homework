import { comments } from "./commentsArr.js";
import { renderComments } from "./renderComments.js";

export function addLikeListeners() {
  const likeButtons = document.querySelectorAll(".like-button");

  likeButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      const index = button.dataset.index;
      const comment = comments[index];

      comment.isLiked = !comment.isLiked;
      comment.likes += comment.isLiked ? 1 : -1;

      renderComments();
    });
  });
}
