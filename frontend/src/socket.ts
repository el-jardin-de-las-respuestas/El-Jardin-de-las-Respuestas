import { io } from "socket.io-client";

export const socket = io("http://localhost:4000", {
  transports: ["websocket"],
  withCredentials: true,
});


socket.on("connect", () => {
  console.log("✅ Socket conectado:", socket.id);
});

socket.on("connect_error", (err) => {
  console.error("❌ Error al conectar socket:", err.message);
});
