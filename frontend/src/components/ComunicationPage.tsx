import { useEffect, useState, useRef } from "react";
import { socket } from "@/socket";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { MessageCircle, Send, Shield } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

interface Message {
  id: number;
  content: string;
  sentAt: string;
  user: {
    id: number;
    username: string;
  };
}

export function ComunicationPage() {
  const { token } = useAuth(); // extraemos token del contexto
  const [chatMessage, setChatMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [chatId, setChatId] = useState<number | null>(null);
  const [connected, setConnected] = useState(false);
  const professionalId = 9; // Ejemplo: ginecóloga; luego podrías hacerlo dinámico
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!token) return;

    // Reautenticar el socket si el token cambia
    socket.auth = { token };
    socket.connect();

    socket.on("connect", () => {
      console.log("✅ Conectado con token:", socket.id);
      setConnected(true);
      socket.emit("joinChat", { professionalId });
    });

    socket.on("joinedChat", ({ chatId }: { chatId: number }) => {
      setChatId(chatId);
    });

    socket.on("chatHistory", (history: Message[]) => {
      setMessages(history);
    });

    socket.on("message", (msg: Message) => {
      setMessages((prev) => [...prev, msg]);
    });

    socket.on("disconnect", () => {
      console.warn("⚠️ Desconectado del chat");
      setConnected(false);
    });

    socket.on("chatError", (err) => {
      console.error("❌ Error del chat:", err);
    });

    return () => {
      socket.off("connect");
      socket.off("joinedChat");
      socket.off("chatHistory");
      socket.off("message");
      socket.off("disconnect");
      socket.off("chatError");
      socket.disconnect();
    };
  }, [token, professionalId]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!chatId || !chatMessage.trim()) return;

    socket.emit("sendMessage", {
      chatId,
      content: chatMessage,
    });

    setChatMessage("");
  };

  return (
    <div className="min-h-screen bg-background px-6 py-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h1 className="mb-4">Canales de Comunicación</h1>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Conecta con profesionales en un espacio seguro y moderado
          </p>
          <div className="mt-6 flex justify-center">
            <Badge className="rounded-[1.5rem] border-2 border-secondary/40 bg-secondary/20 px-6 py-2">
              <Shield className="mr-2 size-4" />
              Mensajes moderados por IA para tu seguridad
            </Badge>
          </div>
        </div>

        <Tabs defaultValue="chat" className="w-full">
          <TabsList className="mb-8 grid w-full max-w-md mx-auto grid-cols-1 rounded-[2rem] border-2 border-secondary/40 bg-secondary/20 p-2">
            <TabsTrigger value="chat" className="rounded-[1.5rem]">
              <MessageCircle className="mr-2 size-4" />
              Chat 1:1
            </TabsTrigger>
          </TabsList>

          <TabsContent value="chat">
            <Card className="mx-auto max-w-4xl overflow-hidden rounded-[3rem] border-2 border-secondary/40 shadow-[0_16px_50px_var(--color-shadow-soft)]">
              <div className="border-b-2 border-secondary/40 bg-secondary/10 px-6 py-4">
                <div className="flex items-center gap-4">
                  <Avatar className="size-12 border-2 border-primary">
                    <AvatarFallback className="bg-primary/20">MG</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3>Dra. María González</h3>
                    <p className="text-sm text-muted-foreground">Ginecóloga Certificada</p>
                  </div>
                  <Badge
                    className={`ml-auto rounded-[1rem] ${
                      connected
                        ? "bg-green-500/20 text-green-700"
                        : "bg-gray-400/20 text-gray-600"
                    }`}
                  >
                    {connected ? "En línea" : "Desconectado"}
                  </Badge>
                </div>
              </div>

              <div className="h-96 space-y-4 overflow-y-auto bg-background p-6">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${
                      msg.user.id === professionalId ? "justify-start" : "justify-end"
                    }`}
                  >
                    <div
                      className={`max-w-sm space-y-1 ${
                        msg.user.id === professionalId ? "items-start" : "items-end"
                      }`}
                    >
                      {msg.user.id === professionalId && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Avatar className="size-6 border border-primary">
                            <AvatarFallback className="bg-primary/20 text-xs">MG</AvatarFallback>
                          </Avatar>
                          <span>{msg.user.username}</span>
                        </div>
                      )}
                      <div
                        className={`rounded-[1.5rem] px-4 py-3 ${
                          msg.user.id === professionalId
                            ? "bg-secondary/30 text-foreground"
                            : "bg-primary text-primary-foreground"
                        }`}
                      >
                        <p>{msg.content}</p>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {new Date(msg.sentAt).toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                ))}
                <div ref={scrollRef} />
              </div>

              <div className="border-t-2 border-secondary/40 bg-secondary/10 p-4">
                <div className="flex gap-3">
                  <Input
                    placeholder="Escribe tu mensaje..."
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    className="rounded-[2rem] border-2 border-secondary/40 px-6 py-6"
                  />
                  <Button
                    onClick={handleSend}
                    className="rounded-[2rem] px-6 shadow-[0_4px_20px_var(--color-shadow-soft)]"
                  >
                    <Send className="size-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
