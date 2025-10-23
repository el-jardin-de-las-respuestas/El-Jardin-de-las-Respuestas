import React from "react";
import { useParams, Link } from "react-router-dom";
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

const ArticleDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const article: Article | undefined = (articlesData as Article[]).find(
    (a) => a.id === Number(id)
  );

  if (!article) return <p>Artículo no encontrado</p>;

  return (
    <section className="p-8 bg-pink-50 min-h-screen">
      <Link to="/" className="text-pink-600 mb-6 inline-block">
        ← Volver a Biblioteca
      </Link>
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
        <p className="text-gray-700 text-sm leading-relaxed">{article.descripcion}</p>
      </div>
    </section>
  );
};

export default ArticleDetail;
