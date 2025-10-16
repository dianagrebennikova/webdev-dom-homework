import { comments } from "./commentsArr.js";
import { renderComments } from "./renderComments.js";
import { delay } from "./delay.js";

export function addLikeListeners() {
  const likeButtons = document.querySelectorAll(".like-button");

  likeButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      const index = button.dataset.index;
      const comment = comments[index];

      comment.isLikeLoading = true;

      renderComments();
      delay(2000).then(() => {
        comment.likes = comment.isLiked ? comment.likes - 1 : comment.likes + 1;
        comment.isLiked = !comment.isLiked;
        comment.isLikeLoading = false;
        renderComments();
      });
    });
  });
}
