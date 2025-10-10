import { useState } from "react";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Search, Clock, BookOpen } from "lucide-react";
import { ImageWithFallback } from "./design/ImageWithFallback";

export function BibliotecaPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const articles = [
    {
      id: 1,
      title: "Cambios en la Pubertad: Lo que Necesitas Saber",
      category: "Cuerpo y Desarrollo",
      readTime: "5 min",
      excerpt:
        "Una guía completa sobre los cambios físicos y emocionales durante la pubertad, explicados de manera clara y sin tabúes.",
      image: "https://images.unsplash.com/photo-1674653760708-f521366e5cde?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBsaWJyYXJ5JTIwYm9va3N8ZW58MXx8fHwxNzU5ODIwNjQ0fDA&ixlib=rb-4.1.0&q=80&w=1080",
      icon: "🌸",
    },
    {
      id: 2,
      title: "¿Qué es el Consentimiento y Por Qué es Importante?",
      category: "Consentimiento",
      readTime: "7 min",
      excerpt:
        "Aprende sobre los límites personales, cómo expresarlos y cómo respetar los de los demás en todas las relaciones.",
      image: "https://images.unsplash.com/photo-1547567667-1aa64e6f58dc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWVucyUyMHN0dWR5aW5nJTIwdG9nZXRoZXJ8ZW58MXx8fHwxNzU5OTMzMDk3fDA&ixlib=rb-4.1.0&q=80&w=1080",
      icon: "🤝",
    },
    {
      id: 3,
      title: "Identidad de Género y Orientación Sexual",
      category: "Identidad y Género",
      readTime: "10 min",
      excerpt:
        "Explora la diversidad de identidades y orientaciones, y aprende a comprender y respetar la tuya y la de los demás.",
      image: "https://images.unsplash.com/photo-1682114857278-bdbb09d787fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmbG93ZXJzJTIwZ2FyZGVuJTIwcGVhY2VmdWx8ZW58MXx8fHwxNzU5OTMzMDk3fDA&ixlib=rb-4.1.0&q=80&w=1080",
      icon: "🌈",
    },
    {
      id: 4,
      title: "Relaciones Saludables: Señales de Alerta",
      category: "Relaciones Saludables",
      readTime: "8 min",
      excerpt:
        "Identifica los signos de una relación saludable versus una tóxica. Tu bienestar emocional es fundamental.",
      image: "https://images.unsplash.com/photo-1547567667-1aa64e6f58dc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWVucyUyMHN0dWR5aW5nJTIwdG9nZXRoZXJ8ZW58MXx8fHwxNzU5OTMzMDk3fDA&ixlib=rb-4.1.0&q=80&w=1080",
      icon: "💕",
    },
    {
      id: 5,
      title: "Métodos Anticonceptivos: Guía Completa",
      category: "Salud Sexual",
      readTime: "12 min",
      excerpt:
        "Información detallada sobre los diferentes métodos anticonceptivos, su eficacia y cómo acceder a ellos.",
      image: "https://images.unsplash.com/photo-1674653760708-f521366e5cde?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBsaWJyYXJ5JTIwYm9va3N8ZW58MXx8fHwxNzU5ODIwNjQ0fDA&ixlib=rb-4.1.0&q=80&w=1080",
      icon: "🩺",
    },
    {
      id: 6,
      title: "Tus Derechos Sexuales y Reproductivos",
      category: "Derechos Sexuales",
      readTime: "6 min",
      excerpt:
        "Conoce tus derechos legales en materia de salud sexual y reproductiva, y cómo ejercerlos.",
      image: "https://images.unsplash.com/photo-1682114857278-bdbb09d787fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmbG93ZXJzJTIwZ2FyZGVuJTIwcGVhY2VmdWx8ZW58MXx8fHwxNzU5OTMzMDk3fDA&ixlib=rb-4.1.0&q=80&w=1080",
      icon: "⚖️",
    },
  ];

  const filteredArticles = articles.filter(
    (article) =>
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background px-6 py-12">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="mb-4 flex justify-center">
            <BookOpen className="size-12 text-primary" />
          </div>
          <h1 className="mb-4">Biblioteca ESI</h1>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Contenido educativo validado por profesionales de la salud. Aprende a tu propio ritmo
            en un espacio sin juicios.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-12" id="biblioteca-search">
          <div className="relative mx-auto max-w-2xl">
            <Search className="absolute left-6 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Busca por tema, palabra clave..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="rounded-[3rem] border-2 border-secondary/40 bg-input-background py-6 pl-14 pr-6 shadow-[0_4px_20px_var(--color-shadow-soft)] focus:border-primary focus:shadow-[0_8px_30px_var(--color-shadow-soft)]"
            />
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredArticles.map((article) => (
            <Card
              key={article.id}
              className="group cursor-pointer overflow-hidden rounded-[2.5rem] border-2 border-secondary/40 bg-card transition-all hover:scale-105 hover:shadow-[0_16px_50px_var(--color-shadow-soft)]"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden bg-secondary/20">
                <ImageWithFallback
                  src={article.image}
                  alt={article.title}
                  className="size-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute left-4 top-4 flex size-12 items-center justify-center rounded-[1.5rem] bg-background/90 text-2xl shadow-lg">
                  {article.icon}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="mb-3 flex items-center gap-2">
                  <Badge className="rounded-[1rem] border-secondary/40 bg-secondary/30 text-foreground">
                    {article.category}
                  </Badge>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock className="size-4" />
                    <span>{article.readTime}</span>
                  </div>
                </div>
                <h3 className="mb-2 line-clamp-2">{article.title}</h3>
                <p className="line-clamp-3 text-muted-foreground">{article.excerpt}</p>
              </div>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredArticles.length === 0 && (
          <div className="py-20 text-center">
            <Search className="mx-auto mb-4 size-12 text-muted-foreground" />
            <h3 className="mb-2">No encontramos resultados</h3>
            <p className="text-muted-foreground">
              Intenta con otras palabras clave o explora todas las categorías
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
