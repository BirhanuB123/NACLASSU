// frontend/src/lib/api.ts
import axios from "axios";

// Use relative URL which will be proxied by Vite
// Vite proxy: /api -> http://localhost:5000/api
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "/api",
  withCredentials: true, // if you use cookies
});

export default api;
