import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Heart, MessageCircle, Share2, Users } from 'lucide-react';
import { useState } from 'react';
import { Badge } from './ui/badge';

export function CommunityPage() {
  const [newPost, setNewPost] = useState('');

  const forumTopics = [
    { title: 'Experiencias con anticonceptivos', posts: 234, active: true },
    { title: 'Apoyo emocional', posts: 189, active: true },
    { title: 'Dudas sobre el ciclo menstrual', posts: 156, active: false },
    { title: 'Consultas médicas generales', posts: 298, active: true },
    { title: 'Derechos y legislación', posts: 87, active: false },
  ];

  const communityPosts = [
    {
      author: 'María L.',
      initials: 'ML',
      time: 'Hace 2 horas',
      content: '¿Alguien tiene experiencia con el DIU de cobre? Estoy considerando cambiarlo por el hormonal y me gustaría saber sus opiniones.',
      likes: 12,
      comments: 8,
      tags: ['anticonceptivos', 'DIU'],
    },
    {
      author: 'Ana S.',
      initials: 'AS',
      time: 'Hace 5 horas',
      content: 'Quiero agradecer a esta comunidad por todo el apoyo. Hoy tuve mi primera consulta ginecológica y fue muy positiva gracias a toda la información que encontré aquí.',
      likes: 45,
      comments: 23,
      tags: ['testimonios', 'agradecimiento'],
    },
    {
      author: 'Laura P.',
      initials: 'LP',
      time: 'Hace 1 día',
      content: '¿Alguna app recomendada para hacer seguimiento del ciclo menstrual? Busco algo simple pero completo.',
      likes: 18,
      comments: 15,
      tags: ['ciclo menstrual', 'tecnología'],
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <h1>Comunidad</h1>
        <p className="text-muted-foreground mt-2">
          Un espacio seguro para compartir experiencias, hacer preguntas y apoyarnos mutuamente
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* New Post Card */}
          <Card>
            <CardHeader>
              <CardTitle>Compartir con la comunidad</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="¿Qué quieres compartir o preguntar?"
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                className="min-h-[100px]"
              />
              <div className="flex justify-between items-center">
                <p className="text-xs text-muted-foreground">
                  Este es un espacio respetuoso y confidencial
                </p>
                <Button disabled={!newPost.trim()}>Publicar</Button>
              </div>
            </CardContent>
          </Card>

          {/* Community Posts */}
          {communityPosts.map((post, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex items-start gap-3">
                  <Avatar>
                    <AvatarFallback className="bg-pink-100 dark:bg-pink-900 text-pink-700 dark:text-pink-300">
                      {post.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4>{post.author}</h4>
                      <span className="text-xs text-muted-foreground">{post.time}</span>
                    </div>
                    <div className="flex gap-2 mt-2">
                      {post.tags.map((tag, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>{post.content}</p>
                <div className="flex items-center gap-6 pt-2 border-t">
                  <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-pink-500 transition-colors">
                    <Heart className="h-4 w-4" />
                    <span>{post.likes}</span>
                  </button>
                  <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                    <MessageCircle className="h-4 w-4" />
                    <span>{post.comments}</span>
                  </button>
                  <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                    <Share2 className="h-4 w-4" />
                    <span>Compartir</span>
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Community Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-purple-500" />
                Estadísticas
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Miembros activos</span>
                <span className="font-semibold">2,847</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Publicaciones hoy</span>
                <span className="font-semibold">127</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Respuestas dadas</span>
                <span className="font-semibold">3,456</span>
              </div>
            </CardContent>
          </Card>

          {/* Forum Topics */}
          <Card>
            <CardHeader>
              <CardTitle>Temas del Foro</CardTitle>
              <CardDescription>Explora las conversaciones activas</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {forumTopics.map((topic, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-accent cursor-pointer transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm">{topic.title}</h4>
                      {topic.active && (
                        <span className="h-2 w-2 rounded-full bg-green-500"></span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">{topic.posts} publicaciones</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Community Guidelines */}
          <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900">
            <CardHeader>
              <CardTitle className="text-sm">Normas de la Comunidad</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-xs text-muted-foreground">
                <li>• Respeto y empatía en todas las interacciones</li>
                <li>• No compartir información médica personal sensible</li>
                <li>• Las opiniones compartidas no sustituyen el consejo médico</li>
                <li>• Reportar contenido inapropiado</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
