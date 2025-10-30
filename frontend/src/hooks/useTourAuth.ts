import { useRef } from 'react';
import { driver } from 'driver.js';
import type { Driver, DriveStep } from 'driver.js';

export function useTourAuth() {
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
    onDestroyed: () => localStorage.setItem('tourCompletedAuth', 'true'),
  }));

  const startWelcomeTour = () => {
    const driverInstance = driverRef.current;

    const steps: DriveStep[] = [
      {
        element: 'body',
        popover: {
          title: '🌸 ¡Bienvenida de nuevo!',
          description: 'Vamos a mostrarte las funciones principales para usuarios logueados.',
          side: 'top',
          align: 'center',
        },
      },
      {
        element: '[data-tour="logo"]',
        popover: {
          title: 'Tu espacio seguro',
          description: 'Accedé a todas las funcionalidades de tu cuenta.',
          side: 'bottom',
          align: 'start',
        },
      },
      {
        element: '[data-tour="nav-inicio"]',
        popover: {
          title: '🏠 Inicio',
          description: 'Volvé al panel principal.',
          side: 'bottom',
        },
      },
      {
        element: '[data-tour="nav-resources"]',
        popover: {
          title: '🏥 Recursos',
          description: 'Accedé a información confiable sobre salud.',
          side: 'bottom',
        },
      },
      {
        element: '[data-tour="nav-community"]',
        popover: {
          title: '👥 Comunidad',
          description: 'Interactuá con otros usuarios y compartí experiencias.',
          side: 'bottom',
        },
      },
      {
        element: '[data-tour="nav-library"]',
        popover: {
          title: '📝 Biblioteca',
          description: 'Leé artículos escritos por profesionales.',
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
        element: '[data-tour="btn-logout"]',
        popover: {
          title: '🔒 Cerrar sesión',
          description: 'Salí de tu cuenta de forma segura.',
          side: 'bottom',
        },
      },
      {
        element: 'body',
        popover: {
          title: '¡Todo listo! 🎉',
          description: 'Ya conocés las funciones principales de tu cuenta. ¡Disfrutá!',
          side: 'top',
          align: 'center',
        },
      },
    ];

    driverInstance.setConfig({ steps });
    driverInstance.drive();
  };

  const shouldShowTour = () => !localStorage.getItem('tourCompletedAuth');

  return { startWelcomeTour, shouldShowTour };
}
