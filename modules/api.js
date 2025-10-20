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
    .then((response) => response.json())
    .then((data) => {
      updateComments(data.comments);
      renderComments();
    })
    .catch((error) => {
      alert("Ошибка загрузки комментариев: " + error.message);
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
