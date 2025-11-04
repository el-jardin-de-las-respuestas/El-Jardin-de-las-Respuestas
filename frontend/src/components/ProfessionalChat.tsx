import { useEffect, useState, useRef } from "react";
import { socket } from "../socket";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent } from "./ui/tabs";
import { Send, ArrowLeft, CheckCheck, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Textarea } from "./ui/textarea";
import type { Message } from "@/types/message";

export default function ProfessionalChat() {
  const navigate = useNavigate();
  const [selectedChat, setSelectedChat] = useState<number | null>(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [chatId, setChatId] = useState<string | null>(null);
  const [consultations, setConsultations] = useState<any[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  const professionalId = 9;
  const userId = 1;

  useEffect(() => {
    socket.connect();

    socket.on("newChat", (data: any) => {
      const { userId, lastMessage, sentAt } = data;
      setConsultations((prev) => {
        const exists = prev.find((c) => c.userId === `Usuario ${userId}`);
        if (exists) return prev;
        return [
          ...prev,
          {
            id: Date.now(),
            userId: `Usuario ${userId}`,
            lastMessage,
            time: new Date(sentAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
            status: "pending",
            unread: true,
            priority: "normal",
          },
        ];
      });
    });

    if (selectedChat) {
      socket.emit("joinChat", { userId, professionalId });

      socket.on("joinedChat", ({ chatRoom }: { chatRoom: string }) => {
        setChatId(chatRoom);
        const selected = consultations.find((c) => c.id === selectedChat);
        if (selected && selected.lastMessage) {
          setMessages([
            {
              id: Date.now(),
              chatId: chatRoom,
              userId,
              content: selected.lastMessage,
              sentAt: new Date().toISOString(),
            },
          ]);
        }
      });

      socket.on("message", (msg: Message) => {
        setMessages((prev) => [...prev, msg]);
        setConsultations((prev) => {
          const existing = prev.find(
            (c) => c.userId === `Usuario ${msg.userId}`
          );
          if (existing) {
            return prev.map((c) =>
              c.userId === `Usuario ${msg.userId}`
                ? {
                    ...c,
                    lastMessage: msg.content,
                    time: new Date(msg.sentAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    }),
                    unread: true,
                  }
                : c
            );
          } else {
            return [
              ...prev,
              {
                id: Date.now(),
                userId: `Usuario ${msg.userId}`,
                lastMessage: msg.content,
                time: new Date(msg.sentAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                }),
                status: "pending",
                unread: true,
                priority: "normal",
              },
            ];
          }
        });
      });
    }

    return () => {
      socket.off("newChat");
      socket.off("joinedChat");
      socket.off("message");
      socket.disconnect();
    };
  }, [selectedChat]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (!chatId || !message.trim()) return;
    const msg = { chatId, userId: professionalId, content: message.trim() };
    socket.emit("sendMessage", msg);
    setMessage("");
  };

  const handleResolveConsultation = () => {
    toast.success("Consulta marcada como resuelta");
    setSelectedChat(null);
    setMessages([]);
  };

  if (selectedChat !== null) {
    const consultation = consultations.find((c) => c.id === selectedChat);
    if (!consultation) return null;

    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-start px-4 py-6">
        <div className="w-full max-w-5xl">
          <div className="flex justify-between mb-4">

          </div>

          <Tabs defaultValue="chat" className="w-full">
            <TabsContent value="chat">
              <Card className="flex flex-col h-[80vh] rounded-2xl border border-secondary/30 shadow-lg bg-background">
                <div className="flex items-center gap-4 border-b border-secondary/30 bg-secondary/10 px-6 py-4">
                  <Button
                    onClick={() => setSelectedChat(null)}
                    variant="ghost"
                    className="rounded-full hover:bg-secondary/30"
                  >
                    <ArrowLeft className="size-5" />
                  </Button>
                  <Avatar className="size-12 border border-primary/60 shadow-sm">
                    <AvatarFallback className="bg-primary/10">U</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-lg">
                      {consultation.userId}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Consulta confidencial
                    </p>
                  </div>
                  <Button
                    onClick={handleResolveConsultation}
                    className="ml-auto rounded-full gap-2"
                  >
                    <CheckCheck className="size-4" />
                    Resuelta
                  </Button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-background/50 backdrop-blur-sm scroll-smooth">
                  {messages.map((msg) => {
                    const isProfessional = msg.userId === professionalId;
                    return (
                      <div
                        key={msg.id}
                        className={`flex ${
                          isProfessional ? "justify-end" : "justify-start"
                        } transition-all`}
                      >
                        <div className="max-w-xs space-y-1">
                          <div
                            className={`px-4 py-2 rounded-2xl shadow-md border border-black/10 ${
                              isProfessional
                                ? "bg-primary text-primary-foreground"
                                : "bg-secondary/30 text-foreground"
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

                <div className="border-t border-secondary/30 bg-secondary/10 px-6 py-3">
                  <div className="flex gap-3 items-center">
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
                      className="flex-1 rounded-full border border-secondary/40 px-4 py-3 focus:ring-2 focus:ring-primary/40"
                    />
                    <Button
                      onClick={handleSendMessage}
                      className="rounded-full px-5 py-3 shadow-md hover:shadow-lg transition"
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

  return (
    <div className="min-h-screen bg-background px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Consultas de usuarios</h1>

        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {consultations.map((consultation) => (
            <Card
              key={consultation.id}
              onClick={() => setSelectedChat(consultation.id)}
              className="cursor-pointer rounded-[2rem] border border-secondary/30 p-6 hover:shadow-lg transition"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-semibold">{consultation.userId}</h4>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {consultation.lastMessage}
                  </p>
                  <span className="text-xs text-muted-foreground">
                    {consultation.time}
                  </span>
                </div>
                {consultation.unread && (
                  <Badge className="rounded-full">Nuevo</Badge>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
