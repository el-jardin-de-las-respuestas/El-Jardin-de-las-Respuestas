import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Textarea } from "./ui/textarea";
import {
  ArrowLeft,
  Search,
  MessageSquare,
  Clock,
  Send,
  CheckCheck,
  AlertTriangle,
} from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export default function ProfessionalChat() {
  const navigate = useNavigate();
  const [selectedChat, setSelectedChat] = useState<number | null>(null);
  const [message, setMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const consultations = [
    {
      id: 1,
      userId: "Usuario Anónimo #1234",
      lastMessage: "Hola, tengo una duda sobre anticonceptivos...",
      time: "Hace 5 min",
      status: "pending",
      unread: true,
      priority: "normal",
    },
    {
      id: 2,
      userId: "Usuario Anónimo #5678",
      lastMessage: "Gracias por tu respuesta, me ayudó mucho",
      time: "Hace 1 hora",
      status: "active",
      unread: false,
      priority: "normal",
    },
    {
      id: 3,
      userId: "Usuario Anónimo #9012",
      lastMessage: "Necesito ayuda urgente con...",
      time: "Hace 2 horas",
      status: "pending",
      unread: true,
      priority: "high",
    },
    {
      id: 4,
      userId: "Usuario Anónimo #3456",
      lastMessage: "Todo quedó muy claro, muchas gracias",
      time: "Hace 3 horas",
      status: "resolved",
      unread: false,
      priority: "normal",
    },
  ];

  const chatHistory = [
    {
      sender: "user",
      message: "Hola, tengo una duda sobre anticonceptivos. ¿Cuál es el más recomendado?",
      time: "14:23",
    },
    {
      sender: "professional",
      message:
        "Hola! Gracias por tu consulta. No existe un método 'mejor' universal, ya que depende de varios factores personales como tu edad, salud general, estilo de vida y preferencias.",
      time: "14:25",
    },
    {
      sender: "user",
      message: "Entiendo. Tengo 16 años y nunca he usado ninguno.",
      time: "14:26",
    },
    {
      sender: "professional",
      message:
        "Perfecto. Para tu edad, algunas opciones comunes son: la píldora anticonceptiva, el preservativo (que también protege contra ITS), o el implante subdérmico. ¿Tienes alguna preferencia o inquietud específica?",
      time: "14:28",
    },
  ];

  const handleSendMessage = () => {
    if (message.trim()) {
      toast.success("Mensaje enviado");
      setMessage("");
    }
  };

  const handleResolveConsultation = () => {
    toast.success("Consulta marcada como resuelta", {
      description: "La conversación se archivará automáticamente",
    });
    setSelectedChat(null);
  };

  const filteredConsultations = consultations.filter(
    (consultation) =>
      consultation.userId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      consultation.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (selectedChat !== null) {
    const consultation = consultations.find((c) => c.id === selectedChat);
    if (!consultation) return null;

    return (
      <div className="flex h-screen flex-col bg-background">
        {/* Chat Header */}
        <div className="border-b-2 border-secondary/40 bg-background/95 backdrop-blur-md">
          <div className="mx-auto max-w-5xl px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button
                  onClick={() => setSelectedChat(null)}
                  variant="ghost"
                  className="gap-2 rounded-[2rem] hover:bg-secondary/30"
                >
                  <ArrowLeft className="size-5" />
                  Volver
                </Button>
                <div>
                  <div className="flex items-center gap-2">
                    <h3>{consultation.userId}</h3>
                    {consultation.priority === "high" && (
                      <Badge className="rounded-[1rem] border-destructive/40 bg-destructive/20 text-destructive">
                        <AlertTriangle className="mr-1 size-3" />
                        Prioridad Alta
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">Chat confidencial</p>
                </div>
              </div>
              <Button
                onClick={handleResolveConsultation}
                className="gap-2 rounded-[2rem] shadow-[0_4px_20px_var(--color-shadow-soft)]"
              >
                <CheckCheck className="size-5" />
                Marcar como Resuelta
              </Button>
            </div>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto bg-background px-6 py-8">
          <div className="mx-auto max-w-4xl space-y-4">
            {/* Info Banner */}
            <div className="rounded-[2rem] border-2 border-primary/40 bg-primary/5 p-4 text-center">
              <p className="text-sm text-muted-foreground">
                🔒 Esta conversación es confidencial. Todas las consultas son anónimas y moderadas
                por IA para seguridad.
              </p>
            </div>

            {chatHistory.map((chat, index) => (
              <div
                key={index}
                className={`flex ${chat.sender === "professional" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[70%] rounded-[2rem] p-4 ${
                    chat.sender === "professional"
                      ? "bg-primary text-primary-foreground"
                      : "border-2 border-secondary/40 bg-card"
                  }`}
                >
                  <p className="mb-1 leading-relaxed">{chat.message}</p>
                  <p
                    className={`text-xs ${chat.sender === "professional" ? "text-primary-foreground/70" : "text-muted-foreground"}`}
                  >
                    {chat.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Message Input */}
        <div className="border-t-2 border-secondary/40 bg-background/95 backdrop-blur-md">
          <div className="mx-auto max-w-4xl px-6 py-4">
            <div className="flex gap-3">
              <Textarea
                placeholder="Escribe tu respuesta..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                className="min-h-[60px] flex-1 resize-none rounded-[2rem] border-2 border-secondary/40 bg-input-background px-6 py-4"
              />
              <Button
                onClick={handleSendMessage}
                className="rounded-[2rem] px-8 shadow-[0_4px_20px_var(--color-shadow-soft)]"
              >
                <Send className="size-5" />
              </Button>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              Recuerda mantener un tono empático y profesional. Evita dar diagnósticos médicos
              definitivos.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background px-6 py-12">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <Button
            onClick={() => navigate('/professional-dashboard')}
            variant="ghost"
            className="gap-2 rounded-[2rem] hover:bg-secondary/30"
          >
            <ArrowLeft className="size-5" />
            Volver al Dashboard
          </Button>
        </div>

        {/* Title */}
        <div className="mb-12 text-center">
          <div className="mb-4 flex justify-center">
            <div className="flex size-16 items-center justify-center rounded-[2rem] bg-primary/20 text-4xl">
              💬
            </div>
          </div>
          <h1 className="mb-4">Chat con Personas Usuarias</h1>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Responde consultas confidenciales de adolescentes. Tu conocimiento profesional puede
            hacer una gran diferencia.
          </p>
        </div>

        {/* Search */}
        <div className="mb-8">
          <div className="relative mx-auto max-w-2xl">
            <Search className="absolute left-6 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar consultas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="rounded-[3rem] border-2 border-secondary/40 bg-input-background py-6 pl-14 pr-6 shadow-[0_4px_20px_var(--color-shadow-soft)]"
            />
          </div>
        </div>

        {/* Stats */}
        <div className="mb-8 grid gap-6 sm:grid-cols-3">
          <Card className="rounded-[2.5rem] border-2 border-secondary/40 p-6 text-center">
            <div className="mb-2 text-3xl">12</div>
            <div className="text-muted-foreground">Consultas Pendientes</div>
          </Card>
          <Card className="rounded-[2.5rem] border-2 border-secondary/40 p-6 text-center">
            <div className="mb-2 text-3xl">8</div>
            <div className="text-muted-foreground">Activas Hoy</div>
          </Card>
          <Card className="rounded-[2.5rem] border-2 border-secondary/40 p-6 text-center">
            <div className="mb-2 text-3xl">124</div>
            <div className="text-muted-foreground">Total Resueltas</div>
          </Card>
        </div>

        {/* Consultations List */}
        <div className="space-y-4">
          {filteredConsultations.map((consultation) => (
            <Card
              key={consultation.id}
              onClick={() => setSelectedChat(consultation.id)}
              className="group cursor-pointer overflow-hidden rounded-[2.5rem] border-2 border-secondary/40 transition-all hover:scale-[1.02] hover:shadow-[0_8px_40px_var(--color-shadow-soft)]"
            >
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <div
                    className={`flex size-12 shrink-0 items-center justify-center rounded-[1.5rem] text-2xl ${
                      consultation.unread ? "bg-primary/20" : "bg-secondary/30"
                    }`}
                  >
                    {consultation.priority === "high" ? "⚠️" : "💬"}
                  </div>
                  <div className="flex-1">
                    <div className="mb-2 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <h4>{consultation.userId}</h4>
                        {consultation.unread && (
                          <Badge className="rounded-[1rem] border-primary/40 bg-primary/20 text-primary">
                            Nuevo
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="size-4" />
                        <span>{consultation.time}</span>
                      </div>
                    </div>
                    <p className="line-clamp-2 text-muted-foreground">
                      {consultation.lastMessage}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Info Card */}
        <div className="mt-12 rounded-[3rem] border-2 border-primary/40 bg-gradient-to-br from-primary/5 to-secondary/10 p-8">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex size-12 items-center justify-center rounded-[1.5rem] bg-primary text-primary-foreground">
              ℹ️
            </div>
            <h3>Guía para Responder Consultas</h3>
          </div>
          <ul className="space-y-2 text-muted-foreground">
            <li className="flex gap-2">
              <span>✓</span>
              <span>Mantén un tono empático, profesional y sin juicios</span>
            </li>
            <li className="flex gap-2">
              <span>✓</span>
              <span>Usa lenguaje claro y accesible para adolescentes</span>
            </li>
            <li className="flex gap-2">
              <span>✓</span>
              <span>Evita dar diagnósticos definitivos; sugiere consulta presencial si es necesario</span>
            </li>
            <li className="flex gap-2">
              <span>✓</span>
              <span>Respeta la confidencialidad en todo momento</span>
            </li>
            <li className="flex gap-2">
              <span>✓</span>
              <span>Si detectas una situación de riesgo, deriva a recursos de emergencia</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}