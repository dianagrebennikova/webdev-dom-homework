import { addComment } from "./modules/addComment.js";
import { fetchComments } from "./modules/api.js";
import { updateComments } from "./modules/commentsArr.js";
import { renderComments } from "./modules/renderComments.js";

document.addEventListener("DOMContentLoaded", () => {
  fetchComments()
    .then((comments) => {
      updateComments(comments);
      renderComments();
    })
    .catch((error) => {
      console.error("Ошибка при загрузке комментариев:", error);
    });

  addComment();
});
