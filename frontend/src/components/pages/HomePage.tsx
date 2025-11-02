import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { MessageCircle, BookOpen, Users, Flower2, Sparkles, Lock } from "lucide-react";
import { ImageWithFallback } from "../design/ImageWithFallback";
import { useTourPublic } from '../../hooks/useTourPublic';
import { useTourAuth } from '../../hooks/useTourAuth';
import { useAuth } from '../../hooks/useAuth';
import { VolunteerSection } from "./VolunteerSection";
import { useNavigate } from "react-router-dom";

export function HomePage() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const { startWelcomeTour: startPublicTour } = useTourPublic();
  const { startWelcomeTour: startAuthTour } = useTourAuth();

  const handleTourClick = () => {
    if (isAuthenticated) {
      startAuthTour();
    } else {
      startPublicTour();
    }
  };

  const handleCategoryClick = () => {
    if (!isAuthenticated) {
      navigate("/auth", { state: { from: "/library" } });
    } else {
      navigate("/library");
    }
  };

  const categories = [
    { 
      title: "Cuerpo y Desarrollo", 
      icon: "🌸", 
      description: "Tu cuerpo cambia y está bien. Aprendé qué es normal y qué esperar en cada etapa" 
    },
    { 
      title: "Relaciones Saludables", 
      icon: "💕", 
      description: "Cómo construir vínculos que te hagan sentir bien, respetadx y queridx" 
    },
    { 
      title: "Identidad y Género", 
      icon: "🌈", 
      description: "Explorá quién sos sin presiones. Tu identidad es tuya y es válida" 
    },
    { 
      title: "Derechos Sexuales", 
      icon: "⚖️", 
      description: "Conocé tus derechos y cómo hacer que se respeten. Tu voz importa" 
    },
    { 
      title: "Salud Sexual", 
      icon: "🩺", 
      description: "Info clara sobre cuidarte, prevenir y tomar decisiones informadas" 
    },
    { 
      title: "Consentimiento", 
      icon: "🤝", 
      description: "Tus límites son sagrados. Aprendé a decir que sí, que no, o que tal vez" 
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* ============= HERO SECTION ============= */}
      {!isAuthenticated ? (
        // HERO PÚBLICO - Más atractivo y llamativo
        <section className="relative overflow-hidden px-3 py-12 lg:py-20">
          {/* Fondo con overlay gradient */}
        

          <div className="relative mx-auto max-w-5xl text-center px-4">
            {/* Animación de flores flotantes */}
            <div className="mb-8 flex justify-center gap-4 animate-pulse">
              <Flower2 className="w-12 h-12 text-pink-400" />
              <Flower2 className="w-20 h-20 text-pink-500" />
              <Flower2 className="w-12 h-12 text-pink-400" />
            </div>

            {/* Badge de bienvenida */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-pink-100 px-6 py-2 text-pink-600 border-2 border-pink-300">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">Tu espacio seguro de aprendizaje</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-pink-500 via-pink-400 to-pink-600 bg-clip-text text-transparent leading-tight">
              El Jardín de las Respuestas
            </h1>

            <p className="mx-auto mb-10 max-w-3xl text-gray-700 text-base sm:text-lg leading-relaxed">
              Un espacio seguro y empático donde puedes <span className="font-semibold text-pink-600">aprender sobre educación sexual integral</span>, 
              hacer preguntas sin miedo y conectar con profesionales de la salud. 
              <span className="block mt-2 text-pink-500 font-medium">Tu autonomía. Tu seguridad. Tu bienestar.</span>
            </p>

            {/* CTAs destacados */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <Button
                onClick={() => navigate("/auth")}
                className="rounded-full bg-gradient-to-r from-pink-500 to-pink-600 px-10 py-6 text-lg shadow-[0_10px_40px_rgba(236,72,153,0.3)] hover:shadow-[0_15px_50px_rgba(236,72,153,0.4)] hover:scale-105 transition-all"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Comenzar Gratis
              </Button>
              
              <Button
                variant="outline"
                onClick={handleTourClick}
                className="rounded-full border-2 border-pink-400 px-10 py-6 text-lg text-pink-600 hover:bg-pink-50 hover:scale-105 transition-all"
              >
                Explorar el Jardín
              </Button>
            </div>

            {/* Stats o beneficios */}
            <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-pink-600">100%</div>
                <div className="text-sm text-gray-600">Confidencial</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-pink-600">24/7</div>
                <div className="text-sm text-gray-600">Disponible</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-pink-600">+1000</div>
                <div className="text-sm text-gray-600">Recursos</div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        // HERO PRIVADO - Más simple y funcional
        <section className="relative overflow-hidden px-3 py-12 lg:py-20">
          <div className="absolute inset-0 opacity-10">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1682114857278-bdbb09d787fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmbG93ZXJzJTIwZ2FyZGVuJTIwcGVhY2VmdWx8ZW58MXx8fHwxNzU5OTMzMDk3fDA&ixlib=rb-4.1.0&q=80&w=1080"
              alt=""
              className="size-full object-cover"
            />
          </div>
          <div className="relative mx-auto max-w-4xl text-center px-4">
            <div className="mb-6 flex justify-center">
              <Flower2 className="w-16 h-16 text-pink-500" />
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-pink-300">
              Bienvenidx de vuelta al Jardín
            </h1>

            <p className="mx-auto mb-8 max-w-2xl text-gray-600 text-sm sm:text-base leading-relaxed">
              Explora nuevos recursos, conecta con profesionales y sigue aprendiendo en tu espacio seguro.
            </p>

            <Button
              variant="outline"
              onClick={handleTourClick}
              className="rounded-[2rem] border-2 border-pink-400 px-8 py-3 shadow text-pink-500 hover:bg-pink-50 transition-colors"
            >
              Ver Tutorial
            </Button>
          </div>
        </section>
      )}

      {/* ============= CATEGORIES SECTION ============= */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 bg-pink-50">
        <div className="mx-auto max-w-7xl">
          {/* Título y descripción */}
          <div className="mb-12 text-center max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-pink-700 mb-4">
              {!isAuthenticated 
                ? "¿Qué te gustaría aprender hoy?" 
                : "Tu biblioteca de ESI te espera"}
            </h2>
            <p className="text-gray-600 text-base">
              {!isAuthenticated
                ? "Tenemos info real, sin tabúes ni juicios. Solo respuestas honestas a tus dudas más importantes."
                : "Explorá, aprendé y seguí creciendo a tu ritmo. Todo está acá para vos."}
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category, index) => (
              <Card
                key={index}
                className={`group cursor-pointer rounded-3xl border-2 bg-white p-8 flex flex-col items-center transition-all duration-300 ${
                  !isAuthenticated 
                    ? 'border-pink-300 hover:shadow-[0_20px_60px_rgba(236,72,153,0.25)] hover:border-pink-400 hover:-translate-y-2' 
                    : 'border-pink-200 hover:shadow-[0_12px_40px_rgba(233,30,99,0.2)] hover:-translate-y-1'
                }`}
                onClick={handleCategoryClick}
              >
                {/* Icono */}
                <div className="relative mb-6">
                  <div className={`flex items-center justify-center w-20 h-20 rounded-full text-4xl transition-transform group-hover:scale-110 ${
                    !isAuthenticated ? 'bg-pink-100' : 'bg-pink-100'
                  }`}>
                    {category.icon}
                  </div>
                  {!isAuthenticated && (
                    <div className="absolute -top-1 -right-1 bg-pink-500 rounded-full p-1.5 animate-pulse">
                      <Lock className="w-3 h-3 text-white" />
                    </div>
                  )}
                </div>

                <h3 className="mb-3 text-xl font-bold text-pink-700 text-center group-hover:text-pink-600 transition-colors">
                  {category.title}
                </h3>

                <p className="text-gray-600 text-base text-center leading-relaxed">
                  {category.description}
                </p>

                {!isAuthenticated && (
                  <div className="mt-5 px-4 py-2 bg-pink-50 rounded-full text-xs text-pink-500 font-medium border border-pink-200">
                    ✨ Ingresa gratuitame para ver más
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ============= COMMUNICATION MODULES ============= */}
      <section className="px-6 py-16" id="communication-preview">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-gray-800">
            Canales de Comunicación Seguros
          </h2>
          <div className="grid gap-8 md:grid-cols-2">
            {/* Chat Module */}
            <Card
              className="cursor-pointer rounded-[3rem] border-2 border-secondary/40 bg-gradient-to-br from-card to-secondary/10 p-8 transition-all hover:shadow-[0_16px_50px_var(--color-shadow-soft)]"
              onClick={() => {
                if (!isAuthenticated) {
                  navigate("/auth", { state: { from: "/communication" } });
                } else {
                  navigate("/communication");
                }
              }}
              id="chat-preview"
            >
              <div className="mb-6 flex size-20 items-center justify-center rounded-[2rem] bg-primary/10">
                <MessageCircle className="size-10 text-primary" />
              </div>
              <h3 className="mb-3 text-xl font-semibold">Chat con Profesionales</h3>
              <p className="mb-4 text-muted-foreground">
                Conversaciones privadas y seguras con profesionales de la salud sexual.
                Todas tus dudas serán respondidas con empatía y profesionalismo.
              </p>
              <Button 
                variant="outline" 
                className="rounded-[2rem]"
              >
                {!isAuthenticated ? 'Registrarse para Chatear' : 'Iniciar Chat'}
              </Button>
            </Card>

            {/* Forum Module */}
            <Card
              className="cursor-pointer rounded-[3rem] border-2 border-secondary/40 bg-gradient-to-br from-card to-secondary/10 p-8 transition-all hover:shadow-[0_16px_50px_var(--color-shadow-soft)]"
              onClick={() => {
                if (!isAuthenticated) {
                  navigate("/auth", { state: { from: "/community" } });
                } else {
                  navigate("/community");
                }
              }}
              id="forum-preview"
            >
              <div className="mb-6 flex size-20 items-center justify-center rounded-[2rem] bg-primary/10">
                <Users className="size-10 text-primary" />
              </div>
              <h3 className="mb-3 text-xl font-semibold">Foro Comunitario</h3>
              <p className="mb-4 text-muted-foreground">
                Comparte experiencias y aprende de otrxs en un ambiente moderado y respetuoso.
                Construimos juntos un espacio de apoyo.
              </p>
              <Button variant="outline" className="rounded-[2rem]">
                {!isAuthenticated ? 'Unirse al Foro' : 'Ver Foro'}
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {!isAuthenticated && <VolunteerSection />}

      {/* ============= FOOTER CTA ============= */}
      {!isAuthenticated && (
        <section className="px-6 py-24 bg-gradient-to-br from-pink-50 to-white">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-8 inline-flex items-center justify-center w-20 h-20 rounded-full bg-pink-100">
              <BookOpen className="w-10 h-10 text-pink-500" />
            </div>
            <h2 className="mb-4 text-4xl font-bold text-gray-800">¿List@ para empezar?</h2>
            <p className="mb-8 text-lg text-gray-600 max-w-2xl mx-auto">
              Únete a nuestra comunidad y accede a contenido educativo validado por profesionales. 
              Es gratis, seguro y confidencial.
            </p>
            <Button
              onClick={() => navigate("/auth")}
              className="rounded-full px-12 py-6 text-lg bg-gradient-to-r from-pink-500 to-pink-600 shadow-[0_10px_40px_rgba(236,72,153,0.3)] hover:shadow-[0_15px_50px_rgba(236,72,153,0.4)] hover:scale-105 transition-all"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Registrarse Gratis
            </Button>
            <p className="mt-6 text-sm text-gray-500">
              Acceso inmediato • 100% confidencial
            </p>
          </div>
        </section>
      )}
    </div>
  );
}