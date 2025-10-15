const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export interface CommunityPost {
  id: number;
  author: string;
  initials: string;
  time: string;
  content: string;
  likes: number;
  comments: number;
  tags: string[];
}

// Traer posts del foro
export async function fetchCommunityPosts(): Promise<CommunityPost[]> {
  const res = await fetch(`${API_URL}/forum/posts`);
  if (!res.ok) throw new Error("Error al obtener posts");
  return res.json();
}

// Crear un post nuevo
export async function createForumPost(content: string): Promise<CommunityPost> {
  const res = await fetch(`${API_URL}/forum/posts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content }),
  });
  if (!res.ok) throw new Error("Error al crear post");
  return res.json();
}

// Dar like a un post
export async function likePost(postId: number): Promise<CommunityPost> {
  const res = await fetch(`${API_URL}/forum/posts/${postId}/like`, { method: "POST" });
  if (!res.ok) throw new Error("Error al dar like");
  return res.json();
}
