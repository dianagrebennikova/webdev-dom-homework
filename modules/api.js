import { updateComments } from "./commentsArr.js";
import { renderComments } from "./renderComments.js";

let isFirstLoad = true;

export function fetchComments() {
  if (isFirstLoad) {
    const commentsList = document.querySelector(".comments");
    commentsList.innerHTML = `<li>Загрузка комментариев...</li>`;
    isFirstLoad = false;
  }

  return fetch("https://wedev-api.sky.pro/api/v1/grebennikova-diana/comments")
    .then((response) => {
      if (!response.ok) {
        if (response.status >= 500) {
          throw new Error("Ошибка сервера. Попробуйте позже");
        }
      }
      return response.json();
    })
    .then((data) => {
      updateComments(data.comments);
      renderComments();
    })
    .catch((error) => {
      if (error.message === "Failed to fetch") {
        alert("Проверьте интернет соединение");
      } else {
        alert("Ошибка загрузки комментариев: " + error.message);
      }
    });
}

export function postComment(name, text) {
  return fetch("https://wedev-api.sky.pro/api/v1/grebennikova-diana/comments", {
    method: "POST",
    body: JSON.stringify({
      name,
      text,
      /* forceError: true, */
    }),
  }).then((response) => {
    if (!response.ok) {
      if (response.status === 400) {
        return response.json().then((err) => {
          throw new Error("Некорректный запрос: " + err.error);
        });
      }
      if (response.status === 500) {
        throw new Error("Ошибка сервера");
      }
    }
    return response.json();
  });
}
