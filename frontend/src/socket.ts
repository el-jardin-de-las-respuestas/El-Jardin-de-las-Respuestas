import { io } from "socket.io-client";

export const socket = io("http://localhost:4000", {
  transports: ["websocket"],
  withCredentials: true,
  reconnection: true,
  reconnectionAttempts: 10,
  reconnectionDelay: 1000,
});

socket.on("connect", () => {
  console.log("✅ Socket conectado:", socket.id);
});

socket.on("disconnect", (reason) => {
  console.warn("⚠️ Socket desconectado:", reason);
});

socket.on("connect_error", (err) => {
  console.error("❌ Error de conexión con Socket.IO:", err.message);
});
