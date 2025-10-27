import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // 👈 importa esto
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter> {/* 👈 envuelve toda la app */}
    <App />
  </BrowserRouter>
);