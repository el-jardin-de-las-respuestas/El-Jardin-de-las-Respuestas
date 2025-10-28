// frontend/src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./styles/globals.css";

// 🔔 Importar Sonner
import { Toaster } from "sonner";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <BrowserRouter>
            <Toaster position="bottom-right" richColors closeButton />
            <App />
        </BrowserRouter>
    </React.StrictMode>
);
