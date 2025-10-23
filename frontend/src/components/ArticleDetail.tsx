import React from "react";
import articlesData from "../data/LibraryEsi.json";
import { Clock } from "lucide-react";

interface Article {
  id: number;
  titulo: string;
  categoria: string;
  duracion: string;
  descripcion: string;
  imagen: string;
}

interface ArticleDetailProps {
  id: number | null;
  onNavigate: (page: string) => void;
}

const ArticleDetail: React.FC<ArticleDetailProps> = ({ id, onNavigate }) => {
  const article: Article | undefined = (articlesData as Article[]).find(
    (a) => a.id === id
  );

  if (!article)
    return (
      <section className="p-8 bg-pink-50 min-h-screen text-center">
        <p className="mb-4">Artículo no encontrado</p>
        <button
          onClick={() => onNavigate("library")}
          className="text-pink-600 underline"
        >
          Volver a la biblioteca
        </button>
      </section>
    );

  return (
    <section className="p-8 bg-pink-50 min-h-screen">
      <button
        onClick={() => onNavigate("library")}
        className="text-pink-600 mb-6 inline-block"
      >
        ← Volver a Biblioteca
      </button>

      <div className="bg-white rounded-2xl shadow p-6 max-w-3xl mx-auto">
        <img
          src={article.imagen}
          alt={article.titulo}
          className="w-full h-64 object-cover rounded-2xl mb-6"
        />
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-2xl font-bold text-pink-600">{article.titulo}</h1>
          <div className="flex items-center text-gray-500 text-sm">
            <Clock size={16} className="mr-1" />
            <span>{article.duracion}</span>
          </div>
        </div>
        <p className="text-sm font-medium text-gray-500 mb-4">
          {article.categoria}
        </p>
        <p className="text-gray-700 text-sm leading-relaxed">
          {article.descripcion}
        </p>
      </div>
    </section>
  );
};

export default ArticleDetail;
