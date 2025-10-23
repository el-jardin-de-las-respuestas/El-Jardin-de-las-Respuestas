import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { MessageCircle, BookOpen, Users, Flower2 } from "lucide-react";
import { ImageWithFallback } from "../design/ImageWithFallback";
import { useTour } from '../../hooks/useTour';
import { useEffect } from 'react';

import { VolunteerSection } from "./VolunteerSection";
interface HomePageProps {
  onNavigate: (page: string) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const { startWelcomeTour, shouldShowTour } = useTour();


  useEffect(() => {
    if (shouldShowTour()) {
      startWelcomeTour();
    }
  }, []);


  const categories = [
    { title: "Cuerpo y Desarrollo", icon: "🌸", description: "Conoce tu cuerpo y sus cambios" },
    { title: "Relaciones Saludables", icon: "💕", description: "Vínculos basados en el respeto" },
    { title: "Identidad y Género", icon: "🌈", description: "Ser quien realmente eres" },
    { title: "Derechos Sexuales", icon: "⚖️", description: "Tus derechos y cómo ejercerlos" },
    { title: "Salud Sexual", icon: "🩺", description: "Cuidados y prevención" },
    { title: "Consentimiento", icon: "🤝", description: "Límites y autonomía personal" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-6 py-20 lg:py-32">
        <div className="absolute inset-0 opacity-10">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1682114857278-bdbb09d787fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmbG93ZXJzJTIwZ2FyZGVuJTIwcGVhY2VmdWx8ZW58MXx8fHwxNzU5OTMzMDk3fDA&ixlib=rb-4.1.0&q=80&w=1080"
            alt=""
            className="size-full object-cover"
          />
        </div>

        <div className="relative mx-auto max-w-4xl text-center">
          <div className="mb-6 flex justify-center">
            <Flower2 className="size-16 text-primary" />
          </div>
          <h1 className="mb-6">Bienvenidx a El Jardín de las Respuestas</h1>
          <p className="mx-auto mb-8 max-w-2xl text-muted-foreground">
            Un espacio seguro y empático donde puedes aprender sobre educación sexual integral,
            hacer preguntas y conectar con profesionales de la salud. Tu autonomía, tu seguridad.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              onClick={() => onNavigate("registro")}
              className="rounded-[2rem] px-8 shadow-[0_8px_30px_var(--color-shadow-soft)]"
              id="cta-register"
            >
              Comenzar mi Viaje
            </Button>
            <Button
              variant="outline"
              onClick={startWelcomeTour}
              className="rounded-[2rem] border-2 border-secondary px-8 shadow-[0_4px_20px_var(--color-shadow-soft)]"
            >
              Explorar el Jardín
            </Button>
          </div>
        </div>
      </section>

      {/* Categories Carousel */}
      <section className="px-6 py-16" id="biblioteca-preview">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-8 text-center">Explora la Biblioteca ESI</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category, index) => (
              <Card
                key={index}
                className="cursor-pointer rounded-[2rem] border-2 border-secondary/40 bg-card p-6 transition-all hover:scale-105 hover:shadow-[0_12px_40px_var(--color-shadow-soft)]"
                onClick={() => onNavigate("biblioteca")}
              >
                <div className="mb-4 flex size-16 items-center justify-center rounded-[1.5rem] bg-secondary/30 text-3xl">
                  {category.icon}
                </div>
                <h3 className="mb-2">{category.title}</h3>
                <p className="text-muted-foreground">{category.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Communication Modules */}
      <section className="px-6 py-16" id="communication-preview">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-12 text-center">Canales de Comunicación Seguros</h2>
          <div className="grid gap-8 md:grid-cols-2">
            {/* Chat Module */}
            <Card
              className="cursor-pointer rounded-[3rem] border-2 border-secondary/40 bg-gradient-to-br from-card to-secondary/10 p-8 transition-all hover:shadow-[0_16px_50px_var(--color-shadow-soft)]"
              onClick={() => onNavigate("communication")}
              id="chat-preview"
            >
              <div className="mb-6 flex size-20 items-center justify-center rounded-[2rem] bg-primary/10">
                <MessageCircle className="size-10 text-primary" />
              </div>
              <h3 className="mb-3">Chat con Ginecólogas</h3>
              <p className="mb-4 text-muted-foreground">
                Conversaciones privadas y seguras con profesionales de la salud sexual.
                Todas tus dudas serán respondidas con empatía y profesionalismo.
              </p>
              <Button variant="outline" className="rounded-[2rem]" onClick={() => onNavigate('communication')}>
                Iniciar Chat
              </Button>
            </Card>

            {/* Forum Module */}
            <Card
              className="cursor-pointer rounded-[3rem] border-2 border-secondary/40 bg-gradient-to-br from-card to-secondary/10 p-8 transition-all hover:shadow-[0_16px_50px_var(--color-shadow-soft)]"
              onClick={() => onNavigate("comunicacion")}
              id="forum-preview"
            >
              <div className="mb-6 flex size-20 items-center justify-center rounded-[2rem] bg-primary/10">
                <Users className="size-10 text-primary" />
              </div>
              <h3 className="mb-3">Foro Comunitario</h3>
              <p className="mb-4 text-muted-foreground">
                Comparte experiencias y aprende de otrxs en un ambiente moderado y respetuoso.
                Construimos juntos un espacio de apoyo.
              </p>
              <Button variant="outline" className="rounded-[2rem]">
                Ver Foro
              </Button>
            </Card>
          </div>
        </div>
      </section>

      <VolunteerSection onNavigate={onNavigate} />

      {/* Footer CTA */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <BookOpen className="mx-auto mb-6 size-12 text-primary" />
          <h2 className="mb-4">¿Listx para empezar?</h2>
          <p className="mb-8 text-muted-foreground">
            Únete a nuestra comunidad y accede a contenido educativo validado por profesionales.
          </p>
          <Button
            onClick={() => onNavigate("registro")}
            className="rounded-[2rem] px-10 shadow-[0_8px_30px_var(--color-shadow-soft)]"
          >
            Registrarse Ahora
          </Button>
        </div>
      </section>
    </div>
  );
}
