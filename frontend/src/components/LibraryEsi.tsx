import React from "react";
import { useNavigate } from "react-router-dom";
import { Clock } from "lucide-react";
import articlesData from "../data/LibraryEsi.json";

interface Article {
  id: number;
  titulo: string;
  categoria: string;
  duracion: string;
  descripcion: string;
  imagen: string;
}

// Componente para cada tarjeta
const ArticleCard: React.FC<{ article: Article }> = ({ article }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/biblioteca/${article.id}`)}
      className="bg-white rounded-2xl shadow hover:shadow-lg cursor-pointer overflow-hidden transition duration-300 flex flex-col"
    >
      <img
        src={article.imagen}
        alt={article.titulo}
        className="w-full h-48 object-cover"
      />
      <div className="p-6 flex flex-col flex-grow">
        <h2 className="text-lg font-semibold text-pink-600 mb-2">{article.titulo}</h2>
        <span className="text-sm font-medium text-white bg-pink-400 inline-block px-3 py-1 rounded-full mb-4 self-start">
          {article.categoria}
        </span>
        <p className="text-gray-700 text-sm leading-relaxed flex-grow">{article.descripcion}</p>
        <div className="flex justify-end items-center mt-4 text-gray-500 text-sm">
          <Clock size={16} className="mr-1" />
          <span>{article.duracion}</span>
        </div>
      </div>
    </div>
  );
};

const LibraryEsi: React.FC = () => {
  const articles: Article[] = articlesData as Article[];

  return (
    <section className="p-8 bg-pink-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8 text-pink-700">Biblioteca ESI</h1>
      <p className="text-center text-gray-600 max-w-2xl mx-auto mb-10">
        Contenido educativo validado por profesionales de la salud. Aprende a tu propio ritmo
        en un espacio sin juicios.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </section>
  );
};

export default LibraryEsi;
