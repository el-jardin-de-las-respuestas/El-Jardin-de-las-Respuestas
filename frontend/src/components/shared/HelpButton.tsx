import { HelpCircle } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { useAuth } from '../../hooks/useAuth';
import { useTourPublic } from '../../hooks/useTourPublic';
import { useTourAuth } from '../../hooks/useTourAuth';

export function HelpButton() {
  const { isAuthenticated } = useAuth();

  // Selecciona el hook según el estado de autenticación
  const { startWelcomeTour } = isAuthenticated ? useTourAuth() : useTourPublic();

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={startWelcomeTour}
            className="fixed bottom-6 right-6 rounded-full shadow-lg h-14 w-14 bg-pink-500 hover:bg-pink-600 text-white z-40 flex items-center justify-center transition-colors"
            aria-label="Ayuda"
          >
            <HelpCircle className="h-6 w-6" />
          </button>
        </TooltipTrigger>
        <TooltipContent side="left">
          <p>¿Necesitas ayuda? Haz clic para ver el tour guiado</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
