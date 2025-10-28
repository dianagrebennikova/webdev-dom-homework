import { registerUser } from "./authApi.js";
import { initApp } from "./initApp.js";

export const renderRegistrationPage = () => {
  const app = document.querySelector(".container");
  app.innerHTML = `
    <h1>Регистрация</h1>
    <form class="register-form">
      <input type="text" name="login" placeholder="Логин" required />
      <input type="text" name="name" placeholder="Имя" required />
      <input type="password" name="password" placeholder="Пароль" required />
      <button type="submit">Зарегистрироваться</button>
    </form>
  `;

  app.querySelector(".register-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const login = e.target.elements.login.value.trim();
    const name = e.target.elements.name.value.trim();
    const password = e.target.elements.password.value.trim();
    try {
      const user = await registerUser(login, name, password);
      localStorage.setItem("user", JSON.stringify(user));
      initApp();
    } catch (err) {
      alert(err.message);
    }
  });
};
