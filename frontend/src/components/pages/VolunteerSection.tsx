import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { HeartHandshake, Sparkles } from "lucide-react";

interface VolunteerSectionProps {
  onNavigate: (page: string) => void;
}

export function VolunteerSection({ onNavigate }: VolunteerSectionProps) {
  return (
    <section className="px-6 py-20 bg-gradient-to-b from-pink-50 to-white">
      <div className="mx-auto max-w-6xl text-center">
        <h2 className="mb-6 text-3xl sm:text-4xl font-bold text-pink-700">
          Sé parte del Jardín 🌷
        </h2>
        <p className="mx-auto mb-12 max-w-2xl text-gray-600 leading-relaxed">
          Si eres profesional de la salud, educador o voluntario comprometido con la educación sexual integral,
          ¡únete a nuestra comunidad y contribuye con tu conocimiento!
        </p>

        <div className="grid gap-10 md:grid-cols-2">
          {/* Tarjeta: Profesional */}
          <Card className="p-8 rounded-[2rem] border-2 border-pink-200 bg-white shadow-[0_12px_40px_rgba(233,30,99,0.1)] transition-all hover:scale-[1.02]">
            <div className="flex flex-col items-center text-center">
              <div className="mb-6 flex size-20 items-center justify-center rounded-full bg-pink-100">
                <HeartHandshake className="size-10 text-pink-500" />
              </div>
              <h3 className="text-xl font-semibold text-pink-700 mb-3">
                Profesionales de la Salud
              </h3>
              <p className="text-gray-600 mb-6 text-sm sm:text-base leading-relaxed">
                Forma parte del equipo que brinda orientación confiable y segura a las usuarias.
                Regístrate como profesional y ayuda a crear un espacio más empático.
              </p>
              <Button
                onClick={() => onNavigate("professional-registration")}
                className="rounded-[2rem] bg-pink-500 hover:bg-pink-600 text-white px-8 shadow-[0_8px_30px_rgba(233,30,99,0.2)]"
              >
                Unirme como Profesional
              </Button>
            </div>
          </Card>

          {/* Tarjeta: Voluntariado */}
          <Card className="p-8 rounded-[2rem] border-2 border-pink-200 bg-white shadow-[0_12px_40px_rgba(233,30,99,0.1)] transition-all hover:scale-[1.02]">
            <div className="flex flex-col items-center text-center">
              <div className="mb-6 flex size-20 items-center justify-center rounded-full bg-pink-100">
                <Sparkles className="size-10 text-pink-500" />
              </div>
              <h3 className="text-xl font-semibold text-pink-700 mb-3">
                Voluntariado
              </h3>
              <p className="text-gray-600 mb-6 text-sm sm:text-base leading-relaxed">
                ¿Te apasiona la educación y la igualdad? Sé parte del Jardín como voluntarix
                y colabora en la difusión de información y acompañamiento a la comunidad.
              </p>
              <Button
                onClick={() => onNavigate("community")}
                variant="outline"
                className="rounded-[2rem] border-pink-400 text-pink-600 hover:bg-pink-50 px-8"
              >
                Ser Voluntario/a
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
