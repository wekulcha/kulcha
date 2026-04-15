/** Dev + ngrok: same-origin `/api/v1` via Vite proxy to Spring (avoids mixed content). */
const API_BASE =
  import.meta.env.VITE_API_URL ??
  (import.meta.env.DEV ? "/api/v1" : "http://localhost:8080/api/v1");

export const BASE_URL = API_BASE;
