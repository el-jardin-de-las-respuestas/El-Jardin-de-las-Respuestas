import { useEffect, useState, useRef } from "react";
import { socket } from "../socket";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent } from "./ui/tabs";
import { Send, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { Message } from "@/types/message";


export function ComunicationPage() {
  const [chatMessage, setChatMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [chatId, setChatId] = useState<string | null>(null); 
  const userId = 1; 
  const professionalId = 9; 
  const scrollRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("✅ Conectado al servidor Socket.IO:", socket.id);
    });

    socket.on("connect_error", (err) => {
      console.error("❌ Error al conectar con Socket.IO:", err.message);
    });

  
    socket.emit("joinChat", { userId, professionalId });

  
    socket.on("joinedChat", ({ chatRoom }: { chatRoom: string }) => {
      console.log("🟢 Unido al chat:", chatRoom);
      setChatId(chatRoom);
    });


    socket.on("message", (msg: Message) => {
      console.log("📨 Mensaje recibido:", msg);
      setMessages((prev) => [...prev, msg]);
    });

    socket.on("chatError", (err: string) => {
      console.error("⚠️ Error del chat:", err);
    });

    return () => {
      socket.off("connect");
      socket.off("connect_error");
      socket.off("joinedChat");
      socket.off("message");
      socket.off("chatError");
    };
  }, [userId, professionalId]);

useEffect(() => {
  const container = scrollRef.current?.parentElement;
  if (container) {
    container.scrollTo({
      top: container.scrollHeight,
      behavior: "smooth",
    });
  }
}, [messages]);

  const handleSend = () => {
    if (!chatId || !chatMessage.trim()) return;

    const message = {
      chatId,
      userId,
      content: chatMessage.trim(),
    };

    socket.emit("sendMessage", message);
    setChatMessage("");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-start px-4 py-6">
      <div className="w-full max-w-5xl">
        <h1 className="text-center text-2xl font-bold mb-6">
          Conecta con profesionales
        </h1>

        <Tabs defaultValue="chat" className="w-full">
          <TabsContent value="chat">
            <Card className="flex flex-col h-[70vh] rounded-2xl border border-secondary/30 shadow-lg bg-background">
              {/* Header */}
              <div className="flex items-center gap-4 border-b border-secondary/30 bg-secondary/10 px-6 py-4">
                <Avatar className="size-12 border border-primary/60 shadow-sm">
                  <AvatarFallback className="bg-primary/10">P</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-lg">Profesional de salud</h3>
                  <p className="text-sm text-muted-foreground">
                    Especialista certificado
                  </p>
                </div>
                <Badge className="ml-auto rounded-full bg-green-500/30 text-green-700">
                  En línea
                </Badge>
              </div>

              {/* Chat messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-background/50 backdrop-blur-sm scroll-smooth" ref={scrollContainerRef}>
                {messages.map((msg) => {
                  const isProfessional = msg.userId === professionalId;
                  return (
                    <div
                      key={msg.id}
                      className={`flex ${
                        isProfessional ? "justify-start" : "justify-end"
                      } transition-all`}
                    >
                      <div className="max-w-xs space-y-1">
                        {isProfessional && (
                          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                            <Avatar className="size-6 border border-primary/50">
                              <AvatarFallback className="bg-primary/10 text-xs">
                                P
                              </AvatarFallback>
                            </Avatar>
                            <span>Profesional</span>
                          </div>
                        )}

                        <div
                          className={`px-4 py-2 rounded-2xl shadow-md ${
                            isProfessional
                              ? "bg-secondary/30 text-foreground"
                              : "bg-primary text-primary-foreground"
                          }`}
                        >
                          <p className="text-[0.93rem] leading-relaxed">
                            {msg.content}
                          </p>
                        </div>

                        <span className="block text-[0.7rem] text-muted-foreground text-right">
                          {new Date(msg.sentAt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                    </div>
                  );
                })}
                <div ref={scrollRef} />
              </div>

              {/* Input */}
              <div className="border-t border-secondary/30 bg-secondary/10 px-6 py-3">
                <div className="flex gap-3 items-center">
                  <Input
                    placeholder="Escribe tu mensaje..."
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    className="flex-1 rounded-full border border-secondary/40 px-4 py-3 focus:ring-2 focus:ring-primary/40"
                  />
                  <Button
                    onClick={handleSend}
                    className="rounded-full px-5 py-3 shadow-md hover:shadow-lg transition"
                  >
                    <Send className="size-4" />
                  </Button>
                </div>
              </div>
            </Card>

            <div className="mt-4 flex justify-center">
              <Badge className="my-6 rounded-full border-2 border-secondary/40 bg-secondary/20 px-6 py-2 flex items-center gap-2 bg-white">
                <Shield className="size-4" />
              </Badge>
            </div>

            <Card className="cursor-pointer rounded-[3rem] border-2 border-secondary/40 bg-white p-8 transition-all hover:shadow-[0_16px_50px_var(--color-shadow-soft)]">
              <h3 className="mb-3 text-xl font-semibold">
                Visita también nuestro Foro Comunitario
              </h3>
              <p className="mb-4 text-muted-foreground">
                Comparte experiencias y aprende de otrxs en un ambiente moderado
                y respetuoso. Construimos juntos un espacio de apoyo.
              </p>

              <Button
                variant="outline"
                className="rounded-[2rem]"
                onClick={() => navigate("/community")}
              >
                Visitar el Foro
              </Button>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
