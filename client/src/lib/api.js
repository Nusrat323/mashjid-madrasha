import { auth } from "../firebase.js";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const request = async (path, { method = "GET", body, authed = false } = {}) => {
  const headers = { "Content-Type": "application/json" };

  if (authed) {
    const token = await auth.currentUser?.getIdToken();
    if (!token) throw new Error("লগইন করা প্রয়োজন");
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.message || "কিছু একটা সমস্যা হয়েছে");
  }

  return data;
};

export const api = {
  get: (path, authed = false) => request(path, { authed }),
  post: (path, body, authed = false) => request(path, { method: "POST", body, authed }),
  put: (path, body, authed = false) => request(path, { method: "PUT", body, authed }),
  patch: (path, body, authed = false) => request(path, { method: "PATCH", body, authed }),
  remove: (path, authed = false) => request(path, { method: "DELETE", authed }),
};
