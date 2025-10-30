const personalKey = "grebennikova-diana";
const baseUrl = `https://wedev-api.sky.pro/api/v2/${personalKey}/comments`;

export const getComments = async (token) => {
  const response = await fetch(baseUrl, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  if (!response.ok) throw new Error("Не удалось загрузить комментарии");
  const data = await response.json();
  return data.comments;
};

export const addComment = async ({ text, token }) => {
  const response = await fetch(baseUrl, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify({ text }),
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.error || "Ошибка при добавлении комментария");
  }
  return response.json();
};
