import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  BookOpen,
  MessageSquare,
  Users,
  FileEdit,
  TrendingUp,
  Heart,
  Award,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ProfessionalDashboard() {
  const navigate = useNavigate();

  const stats = [
    {
      icon: <BookOpen className="size-6" />,
      label: "Artículos Publicados",
      value: "8",
      color: "bg-primary/10 text-primary",
    },
    {
      icon: <MessageSquare className="size-6" />,
      label: "Consultas Respondidas",
      value: "124",
      color: "bg-secondary/30 text-primary",
    },
    {
      icon: <Users className="size-6" />,
      label: "Personas Ayudadas",
      value: "567",
      color: "bg-primary/10 text-primary",
    },
    {
      icon: <Heart className="size-6" />,
      label: "Valoraciones Positivas",
      value: "98%",
      color: "bg-secondary/30 text-primary",
    },
  ];

  const quickActions = [
    {
      title: "Crear Nuevo Artículo",
      description: "Comparte tu conocimiento con la comunidad",
      icon: <FileEdit className="size-8" />,
      action: () => navigate("/professional/library"),
      color: "from-primary/20 to-secondary/20",
    },
    {
      title: "Responder Consultas",
      description: "Atiende el chat con personas usuarias",
      icon: <MessageSquare className="size-8" />,
      action: () => navigate("/professional/chat"),
      color: "from-secondary/30 to-primary/10",
    },
    {
      title: "Moderar Foro",
      description: "Supervisa las conversaciones comunitarias",
      icon: <Users className="size-8" />,
      action: () => navigate("/professional/forum"),
      color: "from-primary/10 to-secondary/30",
    },
  ];

  return (
    <div className="min-h-screen bg-background px-6 py-12">
      <div className="mx-auto max-w-7xl">
        {/* Welcome Banner */}
        <div className="mb-12 rounded-[3rem] border-2 border-primary/40 bg-gradient-to-br from-primary/10 via-secondary/20 to-primary/5 p-8 shadow-[0_8px_40px_var(--color-shadow-soft)] md:p-12">
          <div className="mb-6 flex items-center gap-4">
            <div className="flex size-16 items-center justify-center rounded-[2rem] bg-primary text-primary-foreground shadow-lg">
              <Award className="size-8" />
            </div>
            <div>
              <h1 className="mb-2">Panel de Profesionales</h1>
              <p className="text-muted-foreground">
                Te damos la bienvenida al espacio donde transformas vidas con tu conocimiento
              </p>
            </div>
          </div>

          {/* Impact Message */}
          <div className="rounded-[2rem] border-2 border-secondary/40 bg-background/80 p-6">
            <div className="mb-3 flex items-center gap-2">
              <TrendingUp className="size-5 text-primary" />
              <h3>Tu Impacto en la Comunidad</h3>
            </div>
            <p className="leading-relaxed text-muted-foreground">
              Como profesional de la salud o docente ESI certificado, eres parte fundamental de El
              Jardín de las Respuestas. Tu experiencia y conocimiento ayudan a crear un espacio
              seguro donde adolescentes pueden aprender sobre educación sexual integral sin tabúes
              ni juicios. Cada artículo que escribes, cada consulta que respondes y cada
              conversación que moderas contribuye a formar una comunidad más informada, saludable y
              empoderada.
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="mb-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="rounded-[2.5rem] border-2 border-secondary/40 p-6 shadow-[0_4px_20px_var(--color-shadow-soft)] transition-all hover:scale-105"
            >
              <div className={`mb-4 inline-flex rounded-[1.5rem] p-3 ${stat.color}`}>
                {stat.icon}
              </div>
              <div className="mb-1 text-muted-foreground">{stat.label}</div>
              <div className="text-3xl">{stat.value}</div>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-12">
          <h2 className="mb-6">Acciones Rápidas</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {quickActions.map((action, index) => (
              <Card
                key={index}
                className="group cursor-pointer overflow-hidden rounded-[2.5rem] border-2 border-secondary/40 transition-all hover:scale-105 hover:shadow-[0_16px_50px_var(--color-shadow-soft)]"
                onClick={action.action}
              >
                <div className={`bg-gradient-to-br ${action.color} p-8`}>
                  <div className="mb-4 inline-flex rounded-[2rem] bg-background/90 p-4 text-primary shadow-lg">
                    {action.icon}
                  </div>
                  <h3 className="mb-2">{action.title}</h3>
                  <p className="text-muted-foreground">{action.description}</p>
                  <Button className="mt-6 rounded-[2rem] shadow-[0_4px_20px_var(--color-shadow-soft)]">
                    Ir →
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <h2 className="mb-6">Actividad Reciente</h2>
          <Card className="rounded-[2.5rem] border-2 border-secondary/40 p-8 shadow-[0_4px_20px_var(--color-shadow-soft)]">
            <div className="space-y-6">
              {[
                {
                  type: "article",
                  text: "Publicaste 'Métodos Anticonceptivos: Guía Completa'",
                  time: "Hace 2 horas",
                  badge: "Nuevo Artículo",
                },
                {
                  type: "chat",
                  text: "Respondiste 12 consultas en el chat",
                  time: "Hace 5 horas",
                  badge: "Chat",
                },
                {
                  type: "moderation",
                  text: "Moderaste 8 publicaciones del foro",
                  time: "Hace 1 día",
                  badge: "Moderación",
                },
              ].map((activity, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 rounded-[2rem] bg-secondary/10 p-4"
                >
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-[1.5rem] bg-primary/20 text-2xl">
                    {activity.type === "article"
                      ? "📝"
                      : activity.type === "chat"
                        ? "💬"
                        : "✓"}
                  </div>
                  <div className="flex-1">
                    <div className="mb-1 flex items-center gap-2">
                      <Badge className="rounded-[1rem] border-secondary/40 bg-secondary/30 text-foreground">
                        {activity.badge}
                      </Badge>
                      <span className="text-sm text-muted-foreground">{activity.time}</span>
                    </div>
                    <p>{activity.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 rounded-[3rem] border-2 border-primary/40 bg-gradient-to-br from-secondary/20 to-primary/10 p-8 text-center shadow-[0_8px_40px_var(--color-shadow-soft)]">
          <div className="mb-4 flex justify-center">
            <div className="flex size-16 items-center justify-center rounded-[2rem] bg-primary text-4xl text-primary-foreground shadow-lg">
              🌸
            </div>
          </div>
          <h2 className="mb-4">Gracias por ser parte del cambio</h2>
          <p className="mx-auto mb-6 max-w-2xl text-muted-foreground">
            Tu compromiso como persona voluntaria hace posible que miles de adolescentes accedan a
            educación sexual integral de calidad. Cada acción cuenta, cada palabra tiene impacto.
            Juntos estamos construyendo un futuro más informado y saludable.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              onClick={() => navigate("/professional/library")}
              className="gap-2 rounded-[2rem] bg-primary px-8 py-6 shadow-[0_4px_20px_var(--color-shadow-soft)] hover:scale-105"
            >
              <FileEdit className="size-5" />
              Crear Contenido
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate("/professional/chat")}
              className="gap-2 rounded-[2rem] border-2 border-primary/40 px-8 py-6 shadow-[0_4px_20px_var(--color-shadow-soft)] hover:scale-105 hover:bg-secondary/30"
            >
              <MessageSquare className="size-5" />
              Ver Consultas
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}