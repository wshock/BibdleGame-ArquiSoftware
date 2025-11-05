export async function apiFetch(url, options = {}) {
  const token = localStorage.getItem("token");

  const res = await fetch(`http://localhost:3001${url}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {})
    },
  });

  if (res.status === 401) {
    localStorage.removeItem("token");
    window.location.reload();
  }

  return res.json();
}