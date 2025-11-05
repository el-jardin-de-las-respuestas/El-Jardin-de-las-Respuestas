import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Clock } from "lucide-react";
import axios from "axios";

interface Article {
    id: number;
    title: string;
    description: string;
    content: string;
    createdAt: string;
}

const ArticleDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [article, setArticle] = useState<Article | null>(null);

    const API_URL = import.meta.env.VITE_APP_API_URL;
    async function getLibraryItemById(id: number) {
        const res = await axios.get(`${API_URL}/${id}`);
        return res.data;
    }
    useEffect(() => {
        if (id) {
            getLibraryItemById(Number(id))
                .then(setArticle)
                .catch((err) => console.error("Error cargando artículo:", err));
        }
    }, [id]);

    if (!article) {
        return (
            <section className="p-8 pt-32 bg-pink-50 min-h-screen text-center">
                <p className="text-gray-700">Cargando artículo...</p>
            </section>
        );
    }

    return (
        <section className="p-8 pt-32 bg-pink-50 min-h-screen">
            <div className="mb-6">
                <button
                    onClick={() => navigate("/library")}
                    className="text-pink-600 font-semibold underline inline-block"
                >
                    ← Volver a Biblioteca
                </button>
            </div>

            <div className="bg-white rounded-2xl shadow p-6 max-w-3xl mx-auto">
                <div className="flex items-center justify-between mb-2">
                    <h1 className="text-2xl font-bold text-pink-600">
                        {article.title}
                    </h1>
                    <div className="flex items-center text-gray-500 text-sm">
                        <Clock size={16} className="mr-1" />
                        <span>
                            {new Date(article.createdAt).toLocaleDateString(
                                "es-AR"
                            )}
                        </span>
                    </div>
                </div>

                <p className="text-gray-700 text-sm leading-relaxed mb-6">
                    {article.description}
                </p>

                {/* Contenido completo */}
                <div className="bg-pink-100 p-4 rounded-2xl whitespace-pre-wrap text-gray-800 leading-relaxed">
                    {article.content}
                </div>
            </div>
        </section>
    );
};

export default ArticleDetail;
