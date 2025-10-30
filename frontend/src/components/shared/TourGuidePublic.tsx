import { useEffect } from "react";
import { useTourPublic } from "../../hooks/useTourPublic";
import { useAuth } from "../../hooks/useAuth";
import "driver.js/dist/driver.css";

type TourGuidePublicProps = {
  currentPage: string;
};

export function TourGuidePublic({ currentPage }: TourGuidePublicProps) {
  const { isAuthenticated } = useAuth();
  const { startWelcomeTour, shouldShowTour } = useTourPublic();

  useEffect(() => {
    // Solo mostrar tour si el usuario NO está logueado
    if (!isAuthenticated && currentPage === "home" && shouldShowTour()) {
      const timeout = setTimeout(() => {
        startWelcomeTour();
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [isAuthenticated, currentPage, startWelcomeTour, shouldShowTour]);

  return null;
}
