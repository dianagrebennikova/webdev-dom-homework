import { getComments } from "./api.js";
import { renderCommentsPage } from "./renderCommentsPage.js";

export const initApp = async () => {
  const user = JSON.parse(localStorage.getItem("user"));
  try {
    const comments = await getComments(user?.token);
    renderCommentsPage({ comments, user });
  } catch (err) {
    alert("Ошибка загрузки комментариев: " + err.message);
  }
};
