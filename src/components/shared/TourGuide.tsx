import { useEffect } from 'react';
import { useTour } from '../../hooks/useTour';
import { useAuth } from '../../hooks/useAuth';
import 'driver.js/dist/driver.css';

type TourGuideProps = {
  currentPage: string;
};

export function TourGuide({ currentPage }: TourGuideProps) {
  const  {isAuthenticated} = useAuth();
  const { startWelcomeTour, shouldShowTour } = useTour();

  useEffect(() => {
    // Iniciar tour automáticamente cuando el usuario se autentica por primera vez
    if (isAuthenticated && currentPage === 'catalogs' && shouldShowTour()) {
      // Esperar un poco para que se renderice la página
      const timeout = setTimeout(() => {
        startWelcomeTour();
      }, 500);

      return () => clearTimeout(timeout);
    }
  }, [isAuthenticated, currentPage, startWelcomeTour, shouldShowTour]);

  return null; // Este componente no renderiza nada visible
}
