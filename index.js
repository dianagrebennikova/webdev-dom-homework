import { addComment } from "./modules/addComment.js";
import { fetchComments } from "./modules/api.js";

const addButton = document.querySelector(".add-form-button");
addButton.addEventListener("click", addComment);

fetchComments();
