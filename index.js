import { renderComments } from "./modules/renderComments.js";
import { addComment } from "./modules/addComment.js";
import { updateComments } from "./modules/commentsArr.js";

const addButton = document.querySelector(".add-form-button");
addButton.addEventListener("click", addComment);

fetch(` https://wedev-api.sky.pro/api/v1/:grebennikova-diana/comments`)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    updateComments(data.comments);
    renderComments();
  });
