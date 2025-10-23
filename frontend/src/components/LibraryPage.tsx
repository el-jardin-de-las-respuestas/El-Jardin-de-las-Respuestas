import { useState } from "react";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Search, Clock, BookOpen } from "lucide-react";
import { ImageWithFallback } from "./design/ImageWithFallback";
import articles from "@data/LibraryArticles.json";

export function BibliotecaPage() {
  const [searchQuery, setSearchQuery] = useState("");

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
            Contenido educativo validado por profesionales de la salud. Aprende a tu propio ritmo en un espacio sin juicios.
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

        {filteredArticles.length === 0 && (
          <div className="py-20 text-center">
            <Search className="mx-auto mb-4 size-12 text-muted-foreground" />
            <h3 className="mb-2">No encontramos resultados</h3>
            <p className="text-muted-foreground">Intenta con otras palabras clave o explora todas las categorías</p>
          </div>
        )}
      </div>
    </div>
  );
}