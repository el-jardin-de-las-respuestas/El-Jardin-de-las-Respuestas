import { io } from "socket.io-client";

// Vite: usamos import.meta.env
const SOCKET_URL: string = import.meta.env.VITE_API_URL;

export const socket = io(SOCKET_URL, {
  transports: ["websocket"],
  withCredentials: true,
});

socket.on("connect", () => {
  console.log("✅ Socket conectado:", socket.id);
});

socket.on("connect_error", (err) => {
  console.error("❌ Error al conectar socket:", err.message);
});
