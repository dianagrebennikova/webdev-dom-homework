import { addComment, getComments } from "./api.js";
import { sanitizeHTML } from "./sanitize.js";

export const renderCommentsPage = async ({ comments, user }) => {
  const app = document.querySelector(".container");
  app.innerHTML = `<h1>Лента комментариев</h1>`;

  const commentsList = document.createElement("ul");
  commentsList.className = "comments";
  commentsList.innerHTML = comments
    .map(
      (c) => `
        <li class="comment">
        <div class="comment-header">
            <div>${c.author.name}</div>
            <div>${new Date(c.date).toLocaleString()}</div>
        </div>
        <div class="comment-body">
            ${sanitizeHTML(c.text)}
        </div>
        <div class="comment-footer">
            <div class="likes">
            <span class="likes-counter">${c.likes}</span>
            <button class="like-button ${c.isLiked ? "-active-like" : ""}"></button>
            </div>
        </div>
        </li>`,
    )
    .join("");
  app.appendChild(commentsList);
  document.querySelectorAll(".like-button").forEach((button, index) => {
    button.addEventListener("click", async () => {
      if (!user) {
        alert("Авторизуйтесь, чтобы ставить лайки");
        return;
      }
      const comment = comments[index];
      try {
        const res = await fetch(
          `https://wedev-api.sky.pro/api/v2/grebennikova-diana/comments/${comment.id}/toggle-like`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          },
        );
        const data = await res.json();
        comments[index].likes = data.result.likes;
        comments[index].isLiked = data.result.isLiked;
        renderCommentsPage({ comments, user });
      } catch (error) {
        console.error("Ошибка при лайке:", error);
      }
    });
  });

  if (user) {
    const form = document.createElement("div");
    form.className = "add-form";
    form.innerHTML = `
      <input type="text" class="add-form-name" value="${user.name}" readonly />
      <textarea class="add-form-text" placeholder="Введите комментарий" rows="4"></textarea>
      <div class="add-form-row">
        <button class="add-form-button">Отправить</button>
      </div>
    `;
    app.appendChild(form);

    const submitButton = form.querySelector(".add-form-button");
    const commentInput = form.querySelector(".add-form-text");

    submitButton.addEventListener("click", async () => {
      const text = commentInput.value.trim();
      if (text.length < 3) {
        alert("Комментарий должен содержать хотя бы 3 символа");
        return;
      }

      try {
        await addComment({ text, token: user.token });
        commentInput.value = "";
        const updatedComments = await getComments(user.token);
        renderCommentsPage({ comments: updatedComments, user });
      } catch (err) {
        alert(err.message);
      }
    });
  } else {
    const hint = document.createElement("div");
    hint.className = "login-hint";
    hint.innerHTML = `Чтобы добавить комментарий, <a href="#" id="login-link">авторизуйтесь</a>`;
    app.appendChild(hint);

    const loginLink = document.getElementById("login-link");
    loginLink.addEventListener("click", (e) => {
      e.preventDefault();
      import("./renderLoginPage.js").then((module) => module.renderLoginPage());
    });
  }
};
