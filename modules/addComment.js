import { updateComments } from "./commentsArr.js";
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

  fetch("https://wedev-api.sky.pro/api/v1/grebennikova-diana/comments", {
    method: "POST",
    body: JSON.stringify({
      name: name,
      text: comment,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        return response.json().then((err) => {
          throw new Error(err.error);
        });
      }
      return response.json();
    })
    .then(() => {
      return fetch(
        "https://wedev-api.sky.pro/api/v1/grebennikova-diana/comments"
      );
    })
    .then((response) => response.json())
    .then((data) => {
      updateComments(data.comments);
      renderComments();
    })
    .catch((error) => {
      alert("Ошибка при добавлении комментария: " + error.message);
    });

  nameInput.value = "";
  commentInput.value = "";
}
