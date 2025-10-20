import { postComment } from "./api.js";

export function addComment() {
  const nameInput = document.querySelector(".add-form-name");
  const commentInput = document.querySelector(".add-form-text");
  const submitButton = document.querySelector(".add-form-button");

  const name = nameInput.value.trim();
  const comment = commentInput.value.trim();

  if (name.length < 3 || comment.length < 3) {
    alert("Имя и комментарий должны быть не короче 3 символов");
    return;
  }

  submitButton.disabled = true;
  submitButton.textContent = "Отправка...";

  postComment(name, comment)
    .then(() => {
      nameInput.value = "";
      commentInput.value = "";
    })
    .catch((err) => {
      alert("Ошибка отправки: ", err.message);
    })
    .finally(() => {
      submitButton.disabled = false;
      submitButton.textContent = "Отправить";
    });
}
