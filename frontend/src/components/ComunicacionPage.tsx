import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { MessageCircle, Users, Send, Shield, ThumbsUp, MessageSquare } from "lucide-react";

export function ComunicacionPage() {
  const [chatMessage, setchatMessage] = useState("");
  const [forumPost, setForumPost] = useState("");

  const chatMessages = [
    {
      id: 1,
      sender: "Dra. María González",
      role: "Ginecóloga",
      message:
        "¡Hola! Bienvenidx al chat. Estoy aquí para responder tus preguntas sobre salud sexual. Todo lo que hablemos es confidencial.",
      timestamp: "10:30",
      isDoctor: true,
    },
    {
      id: 2,
      sender: "Tú",
      message: "Hola, tengo algunas dudas sobre métodos anticonceptivos.",
      timestamp: "10:32",
      isDoctor: false,
    },
    {
      id: 3,
      sender: "Dra. María González",
      role: "Ginecóloga",
      message:
        "Por supuesto, con mucho gusto te ayudo. ¿Hay algún método específico sobre el que quieras saber más?",
      timestamp: "10:33",
      isDoctor: true,
    },
  ];

  const forumTopics = [
    {
      id: 1,
      author: "Usuario123",
      title: "¿Cómo hablar con mis padres sobre ESI?",
      excerpt:
        "Me gustaría conversar con mis papás sobre estos temas pero no sé cómo empezar...",
      replies: 12,
      likes: 24,
      category: "Familia",
      timeAgo: "Hace 2 horas",
    },
    {
      id: 2,
      author: "AmigoConfidente",
      title: "Recursos sobre identidad de género",
      excerpt:
        "¿Alguien puede recomendar buenos recursos para entender mejor la identidad de género?",
      replies: 8,
      likes: 15,
      category: "Identidad",
      timeAgo: "Hace 5 horas",
    },
    {
      id: 3,
      author: "CuriosxSiempre",
      title: "Mi experiencia aprendiendo sobre consentimiento",
      excerpt:
        "Quiero compartir cómo cambió mi perspectiva después de aprender sobre el consentimiento...",
      replies: 20,
      likes: 45,
      category: "Consentimiento",
      timeAgo: "Hace 1 día",
    },
  ];

  return (
    <div className="min-h-screen bg-background px-6 py-12">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="mb-4">Canales de Comunicación</h1>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Conecta con profesionales y la comunidad en un espacio seguro y moderado
          </p>
          <div className="mt-6 flex justify-center">
            <Badge className="rounded-[1.5rem] border-2 border-secondary/40 bg-secondary/20 px-6 py-2">
              <Shield className="mr-2 size-4" />
              Todos los mensajes son moderados por IA para tu seguridad
            </Badge>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="chat" className="w-full">
          <TabsList className="mb-8 grid w-full max-w-md mx-auto grid-cols-2 rounded-[2rem] border-2 border-secondary/40 bg-secondary/20 p-2">
            <TabsTrigger value="chat" className="rounded-[1.5rem]" id="chat-tab">
              <MessageCircle className="mr-2 size-4" />
              Chat 1:1
            </TabsTrigger>
            <TabsTrigger value="forum" className="rounded-[1.5rem]" id="forum-tab">
              <Users className="mr-2 size-4" />
              Foro
            </TabsTrigger>
          </TabsList>

          {/* Chat Tab */}
          <TabsContent value="chat">
            <Card className="mx-auto max-w-4xl overflow-hidden rounded-[3rem] border-2 border-secondary/40 shadow-[0_16px_50px_var(--color-shadow-soft)]">
              {/* Chat Header */}
              <div className="border-b-2 border-secondary/40 bg-secondary/10 px-6 py-4">
                <div className="flex items-center gap-4">
                  <Avatar className="size-12 border-2 border-primary">
                    <AvatarFallback className="bg-primary/20">MG</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3>Dra. María González</h3>
                    <p className="text-sm text-muted-foreground">Ginecóloga Certificada</p>
                  </div>
                  <Badge className="ml-auto rounded-[1rem] bg-green-500/20 text-green-700">
                    En línea
                  </Badge>
                </div>
              </div>

              {/* Messages */}
              <div className="h-96 space-y-4 overflow-y-auto bg-background p-6">
                {chatMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.isDoctor ? "justify-start" : "justify-end"}`}
                  >
                    <div
                      className={`max-w-sm space-y-1 ${
                        msg.isDoctor ? "items-start" : "items-end"
                      }`}
                    >
                      {msg.isDoctor && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Avatar className="size-6 border border-primary">
                            <AvatarFallback className="bg-primary/20 text-xs">
                              MG
                            </AvatarFallback>
                          </Avatar>
                          <span>{msg.sender}</span>
                        </div>
                      )}
                      <div
                        className={`rounded-[1.5rem] px-4 py-3 ${
                          msg.isDoctor
                            ? "bg-secondary/30 text-foreground"
                            : "bg-primary text-primary-foreground"
                        }`}
                      >
                        <p>{msg.message}</p>
                      </div>
                      <span className="text-xs text-muted-foreground">{msg.timestamp}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Input */}
              <div className="border-t-2 border-secondary/40 bg-secondary/10 p-4">
                <div className="flex gap-3">
                  <Input
                    placeholder="Escribe tu mensaje..."
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    className="flex-1 rounded-[2rem] border-2 border-secondary/40 bg-background px-6 py-5"
                  />
                  <Button className="rounded-[2rem] px-6 shadow-[0_4px_20px_var(--color-shadow-soft)]">
                    <Send className="size-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Forum Tab */}
          <TabsContent value="forum">
            <div className="mx-auto max-w-5xl">
              {/* New Post */}
              <Card className="mb-8 rounded-[3rem] border-2 border-secondary/40 p-6 shadow-[0_8px_30px_var(--color-shadow-soft)]">
                <h3 className="mb-4">Crear Nueva Publicación</h3>
                <Textarea
                  placeholder="Comparte tus pensamientos, preguntas o experiencias con la comunidad..."
                  value={forumPost}
                  onChange={(e) => setForumPost(e.target.value)}
                  className="mb-4 min-h-32 rounded-[2rem] border-2 border-secondary/40 bg-input-background p-6"
                />
                <Button className="rounded-[2rem] shadow-[0_4px_20px_var(--color-shadow-soft)]">
                  Publicar
                </Button>
              </Card>

              {/* Topics */}
              <div className="space-y-6">
                {forumTopics.map((topic) => (
                  <Card
                    key={topic.id}
                    className="cursor-pointer rounded-[2.5rem] border-2 border-secondary/40 p-6 transition-all hover:shadow-[0_12px_40px_var(--color-shadow-soft)]"
                  >
                    <div className="mb-3 flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="size-10 border-2 border-secondary">
                          <AvatarFallback className="bg-secondary/30">
                            {topic.author[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm">{topic.author}</p>
                          <p className="text-xs text-muted-foreground">{topic.timeAgo}</p>
                        </div>
                      </div>
                      <Badge className="rounded-[1rem] border-secondary/40 bg-secondary/30 text-foreground">
                        {topic.category}
                      </Badge>
                    </div>
                    <h3 className="mb-2">{topic.title}</h3>
                    <p className="mb-4 text-muted-foreground">{topic.excerpt}</p>
                    <div className="flex items-center gap-6 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <ThumbsUp className="size-4" />
                        <span>{topic.likes}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MessageSquare className="size-4" />
                        <span>{topic.replies} respuestas</span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
