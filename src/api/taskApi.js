const BASE = import.meta.env.VITE_API_URL || "http://localhost:3000/api/tasks";

async function request(path = "", options = {}) {
  const res = await fetch(BASE + path, {
    headers: { "Content-Type": "application/json" },
    ...options,
    body: options.body ? JSON.stringify(options.body) : undefined,
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || `Erreur ${res.status}`);
  }
  return res.status === 204 ? null : res.json();
}

export const taskApi = {
  list: (status, sort) => request(`?status=${status}&sort=${sort}`),
  stats: () => request("/stats"),
  create: (task) => request("", { method: "POST", body: task }),
  update: (id, task) => request(`/${id}`, { method: "PUT", body: task }),
  setStatus: (id, done) => request(`/${id}/status`, { method: "PATCH", body: { done } }),
  remove: (id) => request(`/${id}`, { method: "DELETE" }),
};