import React from "react";
import { Link } from "react-router-dom";
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

const articles: Article[] = articlesData as Article[];

const LibraryEsi: React.FC = () => {
  return (
    <section className="p-8 bg-pink-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8 text-pink-700">
        Blog
      </h1>
      <p className="text-center text-gray-600 max-w-2xl mx-auto mb-10">
        Contenido educativo validado por profesionales de la salud. Aprende a tu
        propio ritmo en un espacio sin juicios.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <Link to={`/article/${article.id}`} key={article.id}>
            <div className="bg-white rounded-2xl shadow hover:shadow-lg cursor-pointer overflow-hidden transition duration-300">
              <img
                src={article.imagen}
                alt={article.titulo}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-lg font-semibold text-pink-600">
                    {article.titulo}
                  </h2>
                  <div className="flex items-center text-gray-500 text-sm">
                    <Clock size={16} className="mr-1" />
                    <span>{article.duracion}</span>
                  </div>
                </div>
                <p className="text-sm font-medium text-gray-500 mb-2">
                  {article.categoria}
                </p>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {article.descripcion}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default LibraryEsi;
