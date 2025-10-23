import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@components/ui/card";
import { Button } from "@components/ui/button";
import { Textarea } from "@components/ui/textarea";
import { Avatar, AvatarFallback } from "@components/ui/avatar";
import { Heart, Users } from "lucide-react";
import { Badge } from "@components/ui/badge";
//import { CommunityPost, fetchCommunityPosts, createForumPost, likePost } from "@components/services/api";

export function CommunityPage() {
  const [communityPosts, setCommunityPosts] = useState<CommunityPost[]>([]);
  const [newPost, setNewPost] = useState("");

  // Temas del foro base
  const forumTopics = [
    { title: "Experiencias con anticonceptivos", active: true },
    { title: "Apoyo emocional", active: true },
    { title: "Dudas sobre el ciclo menstrual", active: false },
    { title: "Consultas médicas generales", active: true },
    { title: "Derechos y legislación", active: false },
  ];

  // Traer posts reales al cargar la página
  useEffect(() => {
    fetchCommunityPosts()
      .then(setCommunityPosts)
      .catch(console.error);
  }, []);

  // Crear nuevo post
  const handleCreatePost = async () => {
    if (!newPost.trim()) return;
    try {
      const post = await createForumPost(newPost);
      setCommunityPosts(prev => [post, ...prev]);
      setNewPost("");
    } catch (error) {
      console.error(error);
      alert("Error al publicar el post");
    }
  };

  // Dar like a un post
  const handleLike = async (postId: number) => {
    try {
      const updatedPost = await likePost(postId);
      setCommunityPosts(prev => prev.map(p => (p.id === postId ? updatedPost : p)));
    } catch (error) {
      console.error(error);
      alert("Error al dar like");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="grid lg:grid-cols-3 gap-6">
        {/* --- CONTENIDO PRINCIPAL --- */}
        <div className="lg:col-span-2 space-y-6">
          {/* Crear post */}
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
              <div className="flex justify-end">
                <Button disabled={!newPost.trim()} onClick={handleCreatePost}>
                  Publicar
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Posts reales */}
          {communityPosts.map((post) => (
            <Card key={post.id}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback>{post.initials}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <h4>{post.author}</h4>
                      <span className="text-xs text-muted-foreground">{post.time}</span>
                    </div>
                    <div className="flex gap-2 mt-1">
                      {post.tags.map((tag, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <p>{post.content}</p>
                <button
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-red-500"
                  onClick={() => handleLike(post.id)}
                >
                  <Heart className="h-4 w-4" /> {post.likes}
                </button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* --- SIDEBAR DINÁMICO --- */}
        <div className="space-y-6">
          {/* Estadísticas */}
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
                <span className="font-semibold">{communityPosts.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Respuestas dadas</span>
                <span className="font-semibold">
                  {communityPosts.reduce((acc, post) => acc + (post.comments || 0), 0)}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Temas del foro */}
          <Card>
            <CardHeader>
              <CardTitle>Temas del Foro</CardTitle>
              <CardDescription>Explora las conversaciones activas</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {forumTopics.map((topic, index) => {
                const count = communityPosts.filter((p) =>
                  p.tags.some((tag) =>
                    tag.toLowerCase().includes(topic.title.toLowerCase())
                  )
                ).length;

                return (
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
                      <p className="text-xs text-muted-foreground">{count} publicaciones</p>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* Normas */}
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