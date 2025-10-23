import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Calendar, Clock, User } from 'lucide-react';
import { Input } from '../ui/input';
import { useState } from 'react';

export function BlogPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const blogPosts = [
    {
      title: 'Todo lo que necesitas saber sobre el ciclo menstrual',
      excerpt: 'Descubre las diferentes fases del ciclo menstrual, qué es normal y cuándo consultar con un profesional.',
      author: 'Dra. Patricia Gómez',
      date: '8 de Octubre, 2025',
      readTime: '8 min',
      category: 'Salud Reproductiva',
      tags: ['ciclo menstrual', 'salud'],
    },
    {
      title: 'Métodos anticonceptivos: Guía completa 2025',
      excerpt: 'Comparativa actualizada de todos los métodos anticonceptivos disponibles, su efectividad y cómo elegir el mejor para ti.',
      author: 'Dra. Ana Martínez',
      date: '5 de Octubre, 2025',
      readTime: '12 min',
      category: 'Anticonceptivos',
      tags: ['anticonceptivos', 'planificación familiar'],
    },
    {
      title: 'Derechos sexuales y reproductivos en Argentina',
      excerpt: 'Conoce tus derechos, la legislación vigente y cómo ejercerlos de manera informada.',
      author: 'Lic. Sofía Rodríguez',
      date: '1 de Octubre, 2025',
      readTime: '10 min',
      category: 'Derechos',
      tags: ['derechos', 'legislación'],
    },
    {
      title: 'Salud mental y ciclo menstrual: La conexión',
      excerpt: 'Cómo las fluctuaciones hormonales pueden afectar tu estado de ánimo y qué hacer al respecto.',
      author: 'Lic. Carolina López',
      date: '28 de Septiembre, 2025',
      readTime: '7 min',
      category: 'Salud Mental',
      tags: ['salud mental', 'hormonas'],
    },
    {
      title: 'Prevención de ITS: Más allá del preservativo',
      excerpt: 'Estrategias integrales para cuidar tu salud sexual y prevenir infecciones de transmisión sexual.',
      author: 'Dr. Miguel Santos',
      date: '25 de Septiembre, 2025',
      readTime: '9 min',
      category: 'Prevención',
      tags: ['ITS', 'prevención', 'salud sexual'],
    },
    {
      title: 'Endometriosis: Síntomas y tratamientos',
      excerpt: 'Una guía completa sobre esta condición que afecta a millones de mujeres en el mundo.',
      author: 'Dra. Patricia Gómez',
      date: '20 de Septiembre, 2025',
      readTime: '11 min',
      category: 'Condiciones Médicas',
      tags: ['endometriosis', 'dolor menstrual'],
    },
  ];

  const categories = [
    { name: 'Salud Reproductiva', count: 28 },
    { name: 'Anticonceptivos', count: 15 },
    { name: 'Derechos', count: 12 },
    { name: 'Salud Mental', count: 18 },
    { name: 'Prevención', count: 22 },
    { name: 'Condiciones Médicas', count: 14 },
  ];

  const filteredPosts = blogPosts.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <h1>Blog</h1>
        <p className="text-muted-foreground mt-2">
          Artículos, guías y recursos escritos por profesionales de la salud
        </p>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
      {/* Sidebar */}
      <div className="lg:col-span-1 space-y-6">
        <Card className="bg-white dark:bg-gray-900 text-black dark:text-white border border-gray-200 dark:border-gray-700 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base">Buscar artículos</CardTitle>
          </CardHeader>
          <CardContent>
            <Input
              placeholder="Buscar..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-gray-50 dark:bg-gray-800 text-black dark:text-white border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-500"
            />
          </CardContent>
        </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Categorías</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {categories.map((category, index) => (
                  <button
                    key={index}
                    className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-accent transition-colors text-left"
                  >
                    <span className="text-sm">{category.name}</span>
                    <Badge variant="secondary" className="text-xs">{category.count}</Badge>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-pink-50 to-purple-50 dark:from-pink-950/20 dark:to-purple-950/20 border-pink-200 dark:border-pink-900">
            <CardHeader>
              <CardTitle className="text-sm">¿Quieres contribuir?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground mb-3">
                Si eres profesional de la salud y quieres compartir tu conocimiento, contáctanos.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          {filteredPosts.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">No se encontraron artículos con esa búsqueda</p>
              </CardContent>
            </Card>
          ) : (
            filteredPosts.map((post, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <Badge className="mb-2">{post.category}</Badge>
                      <CardTitle className="mb-2">{post.title}</CardTitle>
                      <CardDescription>{post.excerpt}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{post.readTime} lectura</span>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    {post.tags.map((tag, i) => (
                      <Badge key={i} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
