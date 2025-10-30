// import React from "react";
import { Heart, FileText, MessageSquare, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";


export function VolunteerSection() {
  const navigate = useNavigate();

  return (
    <section className="flex justify-center items-center py-12 px-4">
      <div className="bg-gradient-to-b from-pink-50 to-white dark:from-pink-950/20 dark:to-gray-900 rounded-2xl shadow-md p-6 border border-pink-200 dark:border-pink-800 max-w-2xl w-full">
        <div className="space-y-6">
          {/* Título */}
          <h2 className="text-xl font-semibold text-pink-700 dark:text-pink-400 flex items-center gap-2">
            <Heart className="w-5 h-5 text-pink-600 dark:text-pink-400" />
            ¿Eres Profesional de la Salud o Docente ESI?
          </h2>

          {/* Descripción */}
          <p className="text-gray-600 dark:text-gray-300">
            Únete como persona voluntaria y transforma vidas con tu conocimiento.
            Contribuye a una educación sexual integral y acompañamiento responsable.
          </p>

          {/* Botón principal */}
          <div className="flex justify-center">
            <button
              onClick={() => navigate("/professional-registration")}
              className="bg-pink-600 text-white py-2 px-6 rounded-full hover:bg-pink-700 transition-all font-medium shadow-sm"
            >
              ¡Quiero ser Voluntario!
            </button>
          </div>

          {/* Beneficios / ítems */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6">
            <div className="flex items-center gap-3 bg-pink-100/70 dark:bg-pink-900/30 p-3 rounded-xl border border-pink-200 dark:border-pink-800">
              <FileText className="w-5 h-5 text-pink-600 dark:text-pink-400" />
              <span className="text-gray-700 dark:text-gray-300 text-sm">
                Acceso a materiales educativos ESI
              </span>
            </div>

            <div className="flex items-center gap-3 bg-pink-100/70 dark:bg-pink-900/30 p-3 rounded-xl border border-pink-200 dark:border-pink-800">
              <MessageSquare className="w-5 h-5 text-pink-600 dark:text-pink-400" />
              <span className="text-gray-700 dark:text-gray-300 text-sm">
                Intercambio con otros profesionales
              </span>
            </div>

            <div className="flex items-center gap-3 bg-pink-100/70 dark:bg-pink-900/30 p-3 rounded-xl border border-pink-200 dark:border-pink-800">
              <ShieldCheck className="w-5 h-5 text-pink-600 dark:text-pink-400" />
              <span className="text-gray-700 dark:text-gray-300 text-sm">
                Formación certificada y acompañamiento
              </span>
            </div>

            <div className="flex items-center gap-3 bg-pink-100/70 dark:bg-pink-900/30 p-3 rounded-xl border border-pink-200 dark:border-pink-800">
              <Heart className="w-5 h-5 text-pink-600 dark:text-pink-400" />
              <span className="text-gray-700 dark:text-gray-300 text-sm">
                Impacto social positivo real ❤️
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
