import { postComment, fetchComments } from "./api.js";

export function addComment() {
  const nameInput = document.querySelector(".add-form-name");
  const commentInput = document.querySelector(".add-form-text");
  const submitButton = document.querySelector(".add-form-button");

  const handlePostClick = (attempt = 1) => {
    const name = nameInput.value.trim();
    const comment = commentInput.value.trim();

    if (name.length < 3 || comment.length < 3) {
      alert("Имя и комментарий должны быть не короче 3 символов");
      return;
    }

    submitButton.disabled = true;
    submitButton.textContent =
      attempt > 1 ? `Повторная попытка (${attempt})...` : "Отправка...";

    postComment(name, comment)
      .then(() => {
        nameInput.value = "";
        commentInput.value = "";
        return fetchComments();
      })
      .catch((error) => {
        if (error.message.includes("Некорректный запрос")) {
          alert(error.message);
        } else if (error.message === "Ошибка сервера" && attempt < 2) {
          console.log("Ошибка 500 — пробуем снова...");
          setTimeout(() => handlePostClick(attempt + 1), 1000);
          return;
        } else if (error.message === "Ошибка сервера") {
          alert("Ошибка сервера. Попробуйте позже.");
        } else if (error.message === "Failed to fetch") {
          alert("Проверьте интернет соединение");
        } else {
          alert("Произошла ошибка: " + error.message);
        }
      })
      .finally(() => {
        submitButton.disabled = false;
        submitButton.textContent = "Отправить";
      });
  };

  submitButton.addEventListener("click", handlePostClick);
}
