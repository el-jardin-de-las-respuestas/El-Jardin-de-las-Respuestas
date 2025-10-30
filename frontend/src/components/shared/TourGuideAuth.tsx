import { useEffect } from "react";
import { useTourAuth } from "../../hooks/useTourAuth";
import { useAuth } from "../../hooks/useAuth";
import "driver.js/dist/driver.css";

type TourGuideAuthProps = {
  currentPage: string;
};

export function TourGuideAuth({ currentPage }: TourGuideAuthProps) {
  const { isAuthenticated } = useAuth();
  const { startWelcomeTour, shouldShowTour } = useTourAuth();

  useEffect(() => {
    // Solo mostrar tour si el usuario está logueado
    if (isAuthenticated && currentPage === "home" && shouldShowTour()) {
      const timeout = setTimeout(() => {
        startWelcomeTour();
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [isAuthenticated, currentPage, startWelcomeTour, shouldShowTour]);

  return null;
}
