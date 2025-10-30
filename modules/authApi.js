const authUrl = "https://wedev-api.sky.pro/api/user";

export const loginUser = async (login, password) => {
  const response = await fetch(`${authUrl}/login`, {
    method: "POST",
    body: JSON.stringify({ login, password }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Неверный логин или пароль");
  }

  return (await response.json()).user;
};

export const registerUser = async (login, name, password) => {
  const response = await fetch(authUrl, {
    method: "POST",
    body: JSON.stringify({ login, name, password }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Ошибка регистрации");
  }

  return (await response.json()).user;
};
