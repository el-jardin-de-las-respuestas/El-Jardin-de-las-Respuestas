import { io } from "socket.io-client";
const API_URL = process.env.REACT_APP_API_URL;

export const socket = io(`${API_URL}`, {
  transports: ["websocket"],
  withCredentials: true,
});


socket.on("connect", () => {
  console.log("✅ Socket conectado:", socket.id);
});

socket.on("connect_error", (err) => {
  console.error("❌ Error al conectar socket:", err.message);
});
