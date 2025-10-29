import { useEffect } from "react";
import { useTour } from "../../hooks/useTour";
import { useAuth } from "../../hooks/useAuth";
import "driver.js/dist/driver.css";

type TourGuideProps = {
  currentPage: string;
};

export function TourGuide({ currentPage }: TourGuideProps) {
  const { isAuthenticated } = useAuth();
  const { startWelcomeTour, shouldShowTour } = useTour();

  useEffect(() => {
    if (isAuthenticated && currentPage === "home" && shouldShowTour()) {
      const timeout = setTimeout(() => {
        startWelcomeTour();
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [isAuthenticated, currentPage, startWelcomeTour, shouldShowTour]);

  return null;
}
