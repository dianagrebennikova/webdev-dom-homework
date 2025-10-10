import { comments } from "./commentsArr.js";

export function addReplyListeners() {
  const commentTextEls = document.querySelectorAll(".comment");
  const commentInput = document.querySelector(".add-form-text");

  commentTextEls.forEach((el) => {
    el.addEventListener("click", () => {
      const index = el.dataset.index;
      const comment = comments[index];
      commentInput.value = `Ответ на комментарий: "${comment.author.name}: ${comment.text}"\n`;
    });
  });
}
