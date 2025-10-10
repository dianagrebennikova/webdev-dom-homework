import { postComment } from "./api.js";

export function addComment() {
  const nameInput = document.querySelector(".add-form-name");
  const commentInput = document.querySelector(".add-form-text");

  const name = nameInput.value.trim();
  const comment = commentInput.value.trim();

  if (name.length < 3 || comment.length < 3) {
    alert("Имя и комментарий должны быть не короче 3 символов");
    return;
  }

  postComment(name, comment);

  nameInput.value = "";
  commentInput.value = "";
}
