import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import articlesData from "@data/LibraryEsi.json";
import { Clock } from "lucide-react";

interface Seccion {
  tipo: string;
  titulo?: string;
  texto?: string;
  descripcion?: string;
  contenido?: string[];
  items?: string[];
}

interface Article {
  id: number;
  titulo: string;
  categoria: string;
  duracion: string;
  descripcion: string;
  imagen: string;
  secciones?: Seccion[];
}

const ArticleDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const article: Article | undefined = (articlesData as Article[]).find(
    (a) => a.id === Number(id)
  );

  return (
    <section className="p-8 pt-32 bg-pink-50 min-h-screen">
      {/* Botón siempre visible */}
      <div className="mb-6">
        <button
          onClick={() => navigate("/library")}
          className="text-pink-600 font-semibold underline inline-block"
        >
          ← Volver a Biblioteca
        </button>
      </div>

      {!article ? (
        <div className="text-center mt-20">
          <p className="text-gray-700 mb-4">Artículo no encontrado</p>
        </div>
      ) : (
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
          <p className="text-sm font-medium text-gray-500 mb-4">{article.categoria}</p>
          <p className="text-gray-700 text-sm leading-relaxed mb-6">{article.descripcion}</p>

          {/* Render dinámico de secciones */}
          {article.secciones?.map((sec, i) => {
            switch (sec.tipo) {
              case "intro":
                return (
                  <div key={i} className="bg-pink-200 p-4 rounded-2xl mb-6">
                    <p className="text-gray-700">{sec.texto}</p>
                  </div>
                );
              case "texto":
                return (
                  <div key={i} className="mb-6">
                    <h2 className="text-xl font-semibold text-[#a3687f] mb-2">{sec.titulo}</h2>
                    {sec.contenido?.map((p, j) => (
                      <p key={j} className="text-gray-700 mb-2">{p}</p>
                    ))}
                  </div>
                );
              case "lista":
                return (
                  <div key={i} className="mb-6">
                    <h2 className="text-xl font-semibold text-[#a3687f] mb-4">{sec.titulo}</h2>
                    {sec.descripcion && <p className="text-gray-700 mb-4">{sec.descripcion}</p>}
                    <ul className="space-y-2">
                      {sec.items?.map((item, j) => (
                        <li key={j} className="flex items-start">
                          <span className="w-3 h-3 rounded-full bg-[#a3687f] mr-3 mt-1"></span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              case "numerada":
                return (
                  <div key={i} className="bg-pink-200 p-6 rounded-2xl mb-6">
                    <h2 className="text-xl font-semibold text-[#a3687f] mb-4">{sec.titulo}</h2>
                    {sec.items?.map((item, j) => (
                      <div key={j} className="flex items-start mb-3 bg-white p-3 rounded-xl shadow-sm">
                        <div className="flex items-center justify-center w-6 h-6 rounded-full bg-[#a3687f] text-white mr-3 text-sm font-bold">
                          {j + 1}
                        </div>
                        <p className="text-gray-700">{item}</p>
                      </div>
                    ))}
                  </div>
                );
              case "recursos":
                return (
                  <div key={i} className="bg-pink-200 p-6 rounded-2xl mb-6">
                    <h2 className="text-xl font-semibold text-[#a3687f] mb-4">{sec.titulo}</h2>
                    <ul className="space-y-2 text-gray-700">
                      {sec.items?.map((item, j) => <li key={j}>• {item}</li>)}
                    </ul>
                  </div>
                );
              default:
                return null;
            }
          })}
        </div>
      )}
    </section>
  );
};

export default ArticleDetail;
