import { loginUser } from "./authApi.js";
import { initApp } from "./initApp.js";

export const renderLoginPage = () => {
  const app = document.querySelector(".container");
  app.innerHTML = `
    <h1>Авторизация</h1>
    <form class="login-form">
      <input type="text" name="login" placeholder="Логин" autocomplete="username" required />
      <input type="password" name="password" placeholder="Пароль" autocomplete="current-password" required />
      <button type="submit">Войти</button>
    </form>
    <div>Нет аккаунта? <a href="#" id="register-link">Зарегистрироваться</a></div>
  `;

  app.querySelector(".login-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const login = e.target.elements.login.value.trim();
    const password = e.target.elements.password.value.trim();
    if (!login || !password) {
      alert("Введите логин и пароль (не пустые пробелы)");
      return;
    }
    try {
      const user = await loginUser(login, password);
      localStorage.setItem("user", JSON.stringify(user));
      initApp();
    } catch (err) {
      alert(err.message);
    }
  });

  app.querySelector("#register-link").addEventListener("click", (e) => {
    e.preventDefault();
    import("./renderRegistrationPage.js").then((m) =>
      m.renderRegistrationPage(),
    );
  });
};
