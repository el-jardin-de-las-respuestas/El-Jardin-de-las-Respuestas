import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Heart, Users, MessageCircle, Plus, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface Comment {
  id: number;
  content: string;
  commentedAt: string;
  user: {
    id: number;
    username: string;
  };
}

interface CommunityPost {
  id: number;
  title: string;
  content: string;
  isAnonymous: boolean;
  publishedAt: string;
  user: {
    id: number;
    username: string;
  };
  forum: {
    id: number;
    title: string;
  };
  _count: {
    likes: number;
    comments: number;
  };
}

interface Forum {
  id: number;
  title: string;
  description: string;
}

export default function CommunityPage() {
  const [communityPosts, setCommunityPosts] = useState<CommunityPost[]>([]);
  const [forums, setForums] = useState<Forum[]>([]);
  const [newPost, setNewPost] = useState("");
  const [selectedForumId, setSelectedForumId] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  
  // Estados para comentarios
  const [expandedPostId, setExpandedPostId] = useState<number | null>(null);
  const [comments, setComments] = useState<{ [key: number]: Comment[] }>({});
  const [newComment, setNewComment] = useState<{ [key: number]: string }>({});
  const [loadingComments, setLoadingComments] = useState<{ [key: number]: boolean }>({});
  
  // Estados para crear categoría
  const [showNewCategoryForm, setShowNewCategoryForm] = useState(false);
  const [newCategoryTitle, setNewCategoryTitle] = useState("");
  const [newCategoryDescription, setNewCategoryDescription] = useState("");
  const [isCreatingCategory, setIsCreatingCategory] = useState(false);

  useEffect(() => {
    fetchPosts();
    fetchForums();
  }, []);

  const fetchForums = async () => {
    try {
      const response = await fetch('http://localhost:4000/forum/forums');
      const data = await response.json();
      setForums(data);
    } catch (error) {
      console.error('Error al cargar foros:', error);
      toast.error('Error al cargar las categorías');
    }
  };

  const fetchPosts = async () => {
    try {
      const response = await fetch('http://localhost:4000/forum/posts');
      const data = await response.json();
      setCommunityPosts(data);
    } catch (error) {
      console.error('Error al cargar posts:', error);
      toast.error('Error al cargar las publicaciones');
    }
  };

  const handleCreatePost = async () => {
    if (!newPost.trim()) {
      toast.error('Escribe algo antes de publicar');
      return;
    }

    if (!selectedForumId) {
      toast.error('Selecciona un tema del foro');
      return;
    }

    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');

      const response = await fetch('http://localhost:4000/forum/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          title: "Post de usuario",
          content: newPost,
          forumId: parseInt(selectedForumId),
          isAnonymous: false
        })
      });

      if (response.ok) {
        toast.success('¡Publicación creada!');
        setNewPost("");
        setSelectedForumId("");
        fetchPosts();
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || 'Error al crear la publicación');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error al crear la publicación');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLike = async (postId: number) => {
    try {
      const token = localStorage.getItem('token');

      const response = await fetch(`http://localhost:4000/forum/posts/${postId}/like`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        fetchPosts();
      }
    } catch (error) {
      console.error('Error al dar like:', error);
      toast.error('Error al dar like');
    }
  };

  const toggleComments = async (postId: number) => {
    if (expandedPostId === postId) {
      setExpandedPostId(null);
      return;
    }

    setExpandedPostId(postId);

    if (!comments[postId]) {
      setLoadingComments({ ...loadingComments, [postId]: true });
      try {
        const response = await fetch(`http://localhost:4000/forum/posts/${postId}/comments`);
        const data = await response.json();
        setComments({ ...comments, [postId]: data });
      } catch (error) {
        console.error('Error al cargar comentarios:', error);
        toast.error('Error al cargar comentarios');
      } finally {
        setLoadingComments({ ...loadingComments, [postId]: false });
      }
    }
  };

  const handleCreateComment = async (postId: number) => {
    const commentText = newComment[postId]?.trim();
    if (!commentText) {
      toast.error('Escribe un comentario');
      return;
    }

    try {
      const token = localStorage.getItem('token');

      const response = await fetch(`http://localhost:4000/forum/posts/${postId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ content: commentText })
      });

      if (response.ok) {
        const newCommentData = await response.json();
        setComments({
          ...comments,
          [postId]: [...(comments[postId] || []), newCommentData]
        });
        setNewComment({ ...newComment, [postId]: "" });
        toast.success('¡Comentario agregado!');
        fetchPosts(); // Actualizar contador de comentarios
      } else {
        toast.error('Error al crear el comentario');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error al crear el comentario');
    }
  };

  const handleCreateCategory = async () => {
    if (!newCategoryTitle.trim()) {
      toast.error('Ingresa un título para la categoría');
      return;
    }

    if (!newCategoryDescription.trim()) {
      toast.error('Ingresa una descripción');
      return;
    }

    setIsCreatingCategory(true);
    try {
      const token = localStorage.getItem('token');

      const response = await fetch('http://localhost:4000/forum/forums', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          title: newCategoryTitle,
          description: newCategoryDescription
        })
      });

      if (response.ok) {
        toast.success('¡Categoría creada exitosamente!');
        setNewCategoryTitle("");
        setNewCategoryDescription("");
        setShowNewCategoryForm(false);
        fetchForums();
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || 'Error al crear la categoría');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error al crear la categoría');
    } finally {
      setIsCreatingCategory(false);
    }
  };

  const getInitials = (username: string) => {
    return username
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getTimeAgo = (date: string) => {
    const now = new Date();
    const postDate = new Date(date);
    const diffMs = now.getTime() - postDate.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return 'ahora';
    if (diffMins < 60) return `hace ${diffMins} minutos`;
    if (diffHours < 24) return `hace ${diffHours} horas`;
    return `hace ${diffDays} días`;
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
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Selecciona un tema
                </label>
                <select
                  value={selectedForumId}
                  onChange={(e) => setSelectedForumId(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white dark:bg-gray-800 dark:border-gray-600"
                >
                  <option value="">Elige una categoría...</option>
                  {forums.map((forum) => (
                    <option key={forum.id} value={forum.id.toString()}>
                      {forum.title}
                    </option>
                  ))}
                </select>
              </div>

              <Textarea
                placeholder="¿Qué quieres compartir o preguntar?"
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                className="min-h-[100px]"
              />
              <div className="flex justify-end">
                <Button
                  disabled={!newPost.trim() || !selectedForumId || isLoading}
                  onClick={handleCreatePost}
                >
                  {isLoading ? 'Publicando...' : 'Publicar'}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Posts */}
          {communityPosts.length === 0 ? (
            <Card>
              <CardContent className="py-8 text-center text-muted-foreground">
                No hay publicaciones aún. ¡Sé el primero en compartir!
              </CardContent>
            </Card>
          ) : (
            communityPosts.map((post) => (
              <Card key={post.id}>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback>
                        {post.isAnonymous ? 'UA' : getInitials(post.user.username)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <h4 className="font-semibold">
                          {post.isAnonymous ? 'Usuario Anónimo' : post.user.username}
                        </h4>
                        <span className="text-xs text-muted-foreground">
                          {getTimeAgo(post.publishedAt)}
                        </span>
                      </div>
                      <div className="flex gap-2 mt-1">
                        <Badge variant="secondary" className="text-xs">
                          {post.forum.title}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm">{post.content}</p>
                  
                  {/* Botones de interacción */}
                  <div className="flex gap-4">
                    <button
                      className="flex items-center gap-2 text-sm text-muted-foreground hover:text-red-500 transition-colors"
                      onClick={() => handleLike(post.id)}
                    >
                      <Heart className="h-4 w-4" /> {post._count.likes}
                    </button>
                    <button
                      className="flex items-center gap-2 text-sm text-muted-foreground hover:text-blue-500 transition-colors"
                      onClick={() => toggleComments(post.id)}
                    >
                      <MessageCircle className="h-4 w-4" /> {post._count.comments}
                    </button>
                  </div>

                  {/* Sección de comentarios expandible */}
                  {expandedPostId === post.id && (
                    <div className="mt-4 pt-4 border-t space-y-3">
                      {loadingComments[post.id] ? (
                        <p className="text-sm text-muted-foreground text-center">Cargando comentarios...</p>
                      ) : (
                        <>
                          {/* Lista de comentarios */}
                          {comments[post.id]?.length > 0 ? (
                            <div className="space-y-3 mb-4">
                              {comments[post.id].map((comment) => (
                                <div key={comment.id} className="flex gap-3 bg-muted/30 p-3 rounded-lg">
                                  <Avatar className="h-8 w-8">
                                    <AvatarFallback className="text-xs">
                                      {getInitials(comment.user.username)}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div className="flex-1">
                                    <div className="flex justify-between items-center mb-1">
                                      <span className="text-sm font-semibold">{comment.user.username}</span>
                                      <span className="text-xs text-muted-foreground">
                                        {getTimeAgo(comment.commentedAt)}
                                      </span>
                                    </div>
                                    <p className="text-sm">{comment.content}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="text-sm text-muted-foreground text-center mb-4">
                              No hay comentarios aún. ¡Sé el primero en comentar!
                            </p>
                          )}

                          {/* Campo para nuevo comentario */}
                          <div className="flex gap-2">
                            <Textarea
                              placeholder="Escribe un comentario..."
                              value={newComment[post.id] || ""}
                              onChange={(e) => setNewComment({ ...newComment, [post.id]: e.target.value })}
                              className="min-h-[60px]"
                            />
                            <Button
                              onClick={() => handleCreateComment(post.id)}
                              disabled={!newComment[post.id]?.trim()}
                              size="sm"
                            >
                              Enviar
                            </Button>
                          </div>
                        </>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* --- SIDEBAR --- */}
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
                  {communityPosts.reduce((acc, post) => acc + post._count.comments, 0)}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Temas del foro */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Temas del Foro</CardTitle>
                  <CardDescription>Explora las conversaciones activas</CardDescription>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setShowNewCategoryForm(!showNewCategoryForm)}
                >
                  {showNewCategoryForm ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {/* Formulario para crear categoría */}
              {showNewCategoryForm && (
                <div className="p-4 border rounded-lg bg-muted/30 space-y-3 mb-4">
                  <Input
                    placeholder="Título de la categoría"
                    value={newCategoryTitle}
                    onChange={(e) => setNewCategoryTitle(e.target.value)}
                  />
                  <Textarea
                    placeholder="Descripción"
                    value={newCategoryDescription}
                    onChange={(e) => setNewCategoryDescription(e.target.value)}
                    className="min-h-[60px]"
                  />
                  <Button
                    onClick={handleCreateCategory}
                    disabled={isCreatingCategory || !newCategoryTitle.trim() || !newCategoryDescription.trim()}
                    className="w-full"
                    size="sm"
                  >
                    {isCreatingCategory ? 'Creando...' : 'Crear Categoría'}
                  </Button>
                </div>
              )}

              {forums.map((forum) => {
                const count = communityPosts.filter((p) => p.forum.id === forum.id).length;
                const isActive = count > 0;

                return (
                  <div
                    key={forum.id}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-accent cursor-pointer transition-colors"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-medium">{forum.title}</h4>
                        {isActive && (
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