import { comments } from "./commentsArr.js";
import { getCurrentFormattedDate } from "./getDate.js";
import { renderComments } from "./renderComments.js";

export function addComment() {
  const nameInput = document.querySelector(".add-form-name");
  const commentInput = document.querySelector(".add-form-text");

  const name = nameInput.value.trim();
  const comment = commentInput.value.trim();

  if (!name || !comment) {
    alert("Пожалуйста, введите имя и комментарий.");
    return;
  }

  comments.push({
    name,
    date: getCurrentFormattedDate(),
    text: comment,
    likes: 0,
    isLiked: false,
  });

  nameInput.value = "";
  commentInput.value = "";

  renderComments();
}
