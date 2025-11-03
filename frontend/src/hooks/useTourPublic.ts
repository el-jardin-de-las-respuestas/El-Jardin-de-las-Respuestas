import { useRef } from 'react';
import { driver } from 'driver.js';
import type { Driver, DriveStep } from 'driver.js';

export function useTourPublic() {
  const driverRef = useRef<Driver>(driver({
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
    onDestroyed: () => localStorage.setItem('tourCompletedPublic', 'true'),
  }));

  const startWelcomeTour = () => {
    const driverInstance = driverRef.current;

    const steps: DriveStep[] = [
      {
        element: 'body',
        popover: {
          title: '🌸 ¡Bienvenida a El Jardín de las Respuestas!',
          description: 'Recorré las funciones básicas y conocé el sitio.',
          side: 'top',
          align: 'center',
        },
      },
      {
        element: '[data-tour="logo"]',
        popover: {
          title: 'Tu espacio seguro',
          description: 'Aquí accedés a información confiable.',
          side: 'bottom',
          align: 'start',
        },
      },
      {
        element: '[data-tour="nav-inicio"]',
        popover: {
          title: '🏠 Inicio',
          description: 'Volvé a la página principal desde aquí.',
          side: 'bottom',
        },
      },
      {
        element: '[data-tour="nav-about"]',
        popover: {
          title: 'ℹ️ Acerca de',
          description: 'Conocé más sobre nosotros.',
          side: 'bottom',
        },
      },
      {
        element: '[data-tour="nav-faq"]',
        popover: {
          title: '❓ FAQ',
          description: 'Preguntas frecuentes y ayuda.',
          side: 'bottom',
        },
      },
      {
        element: '[data-tour="toggle-theme"]',
        popover: {
          title: '🌓 Modo Claro/Oscuro',
          description: 'Cambiá entre modo claro y oscuro.',
          side: 'left',
        },
      },
      {
        element: '[data-tour="btn-login"]',
        popover: {
          title: '🔑 Login',
          description: 'Accedé a tu cuenta.',
          side: 'bottom',
        },
      },
      {
        element: 'body',
        popover: {
          title: '¡Todo listo! 🎉',
          description: 'Explorá con confianza y disfrutá la experiencia.',
          side: 'top',
          align: 'center',
        },
      },
    ];

    driverInstance.setSteps(steps);
    driverInstance.drive();
  };

  const shouldShowTour = () => !localStorage.getItem('tourCompletedPublic');

  return { startWelcomeTour, shouldShowTour };
}
