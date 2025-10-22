import { useEffect, useState } from 'react';
import { driver } from 'driver.js';
import type { Driver, DriveStep } from 'driver.js';

export function useTour() {
  const [driverInstance, setDriverInstance] = useState<Driver | null>(null);

  useEffect(() => {
    // Inicializar Driver.js con estilos personalizados
    const driverObj = driver({
      showProgress: true,
      showButtons: ['next', 'previous', 'close'],
      progressText: '{{current}} de {{total}}',
      nextBtnText: 'Siguiente',
      prevBtnText: 'Anterior',
      doneBtnText: 'Finalizar',
      popoverClass: 'driver-popover-custom',
      overlayColor: 'rgba(0, 0, 0, 0.7)',
      stagePadding: 10,
      stageRadius: 10,
      allowClose: true,
      onDestroyed: () => {
        localStorage.setItem('tourCompleted', 'true');
      },
    });

    setDriverInstance(driverObj);

    return () => {
      driverObj.destroy();
    };
  }, []);

  const startWelcomeTour = () => {
    if (!driverInstance) return;

    const steps: DriveStep[] = [
      {
        element: 'body',
        popover: {
          title: '🌸 ¡Bienvenida a El Jardín de las Respuestas!',
          description: 'Vamos a hacer un recorrido rápido para que conozcas todas las funciones disponibles. ¡Empecemos!',
          side: 'top',
          align: 'center',
        },
      },
      {
        element: '[data-tour="logo"]',
        popover: {
          title: 'Tu espacio seguro',
          description: 'Este es tu hogar de información confiable sobre salud sexual y reproductiva.',
          side: 'bottom',
          align: 'start',
        },
      },
      {
        element: '[data-tour="nav-catalogs"]',
        popover: {
          title: '📚 Catálogos de Información',
          description: 'Encuentra información verificada sobre salud reproductiva, anticonceptivos, derechos sexuales y más.',
          side: 'bottom',
        },
      },
      {
        element: '[data-tour="nav-resources"]',
        popover: {
          title: '🏥 Recursos y Apoyo',
          description: 'Accede a centros de salud, líneas de ayuda y recursos descargables.',
          side: 'bottom',
        },
      },
      {
        element: '[data-tour="nav-community"]',
        popover: {
          title: '👥 Comunidad',
          description: 'Un espacio seguro para compartir experiencias, hacer preguntas y apoyarnos mutuamente.',
          side: 'bottom',
        },
      },
      {
        element: '[data-tour="nav-blog"]',
        popover: {
          title: '📝 Blog',
          description: 'Artículos escritos por profesionales de la salud sobre temas actuales y relevantes.',
          side: 'bottom',
        },
      },

      {
        element: '[data-tour="theme-toggle"]',
        popover: {
          title: '🌓 Modo Claro/Oscuro',
          description: 'Cambia entre modo claro y oscuro según tu preferencia.',
          side: 'left',
        },
      },
      {
        element: 'body',
        popover: {
          title: '¡Todo listo! 🎉',
          description: 'Ya conoces las funciones principales. Recuerda: tu privacidad es importante y puedes usar la plataforma de forma anónima. ¡Explora con confianza!',
          side: 'top',
          align: 'center',
        },
      },
    ];

    driverInstance.setConfig({ steps });
    driverInstance.drive();
  };

  const startCatalogsTour = () => {
    if (!driverInstance) return;

    const steps: DriveStep[] = [
      {
        element: '[data-tour="catalogs-tabs"]',
        popover: {
          title: 'Explora por categorías',
          description: 'Navega entre diferentes temas para encontrar la información que necesitas.',
          side: 'top',
        },
      },
      {
        element: '[data-tour="search-catalogs"]',
        popover: {
          title: 'Busca información',
          description: 'Usa la búsqueda para encontrar rápidamente temas específicos.',
          side: 'bottom',
        },
      },
    ];

    driverInstance.setConfig({ steps });
    driverInstance.drive();
  };

  const shouldShowTour = () => {
    return !localStorage.getItem('tourCompleted');
  };

  return {
    startWelcomeTour,
    startCatalogsTour,
    shouldShowTour,
  };
}