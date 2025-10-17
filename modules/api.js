import { updateComments } from "./commentsArr.js";
import { renderComments } from "./renderComments.js";

export function fetchComments() {
  const commentsList = document.querySelector(".comments");
  let loaderTimeout;

  loaderTimeout = setTimeout(() => {
    commentsList.innerHTML = `<li>Загрузка комментариев...</li>`;
  }, 500);

  return fetch("https://wedev-api.sky.pro/api/v1/grebennikova-diana/comments")
    .then((response) => response.json())
    .then((data) => {
      clearTimeout(loaderTimeout);
      updateComments(data.comments);
      renderComments();
    })
    .catch((error) => {
      clearTimeout(loaderTimeout);
      commentsList.innerHTML = `<li>Ошибка: ${error.message}</li>`;
    });
}

export function postComment(name, text) {
  return fetch("https://wedev-api.sky.pro/api/v1/grebennikova-diana/comments", {
    method: "POST",
    body: JSON.stringify({
      name,
      text,
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
    .then(() => fetchComments());
}
