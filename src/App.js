import React from "react";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import "./App.css";

function App() {
  const iniciarTour = () => {
    const driverObj = driver({
      showProgress: true,
      steps: [
        {
          element: "#nav-biblioteca",
          popover: {
            title: "📚 Biblioteca",
            description: "Aquí encontrarás información confiable sobre ESI.",
            position: "bottom",
          },
        },
        {
          element: "#nav-chat",
          popover: {
            title: "💬 Chat",
            description: "Podrás hablar con una profesional de forma segura.",
            position: "bottom",
          },
        },
        {
          element: "#nav-foro",
          popover: {
            title: "🧵 Foro",
            description: "Espacio para compartir dudas y experiencias.",
            position: "bottom",
          },
        },
      ],
    });

    driverObj.drive();
  };

  return (
    <div className="App">
      <header className="header">
        <h1>El Jardín de las Respuestas</h1>
        <nav>
          <ul className="nav">
            <li id="nav-biblioteca">Biblioteca</li>
            <li id="nav-chat">Chat</li>
            <li id="nav-foro">Foro</li>
          </ul>
        </nav>
        <button className="tour-btn" onClick={iniciarTour}>
          Iniciar Tour 🚀
        </button>
      </header>

      <main>
        <section className="hero">
          <h2>Bienvenida 👋</h2>
          <p>
            Esta es la primera versión del MVP de la plataforma. Acá se van a
            conectar los módulos reales más adelante.
          </p>
          <button className="login-btn">Login (placeholder)</button>
        </section>
      </main>
    </div>
  );
}

export default App;

