import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import {
  ArrowLeft,
  Plus,
  FileEdit,
  Trash2,
  Eye,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { toast } from "sonner";

interface ProfessionalBibliotecaProps {
  onBack: () => void;
}

export default function ProfessionalLibrary({ onBack }: ProfessionalBibliotecaProps) {
  const [view, setView] = useState<"list" | "create" | "edit">("list");
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    excerpt: "",
    readTime: "",
    introduction: "",
    sections: [{ title: "", content: "" }],
    keyTakeaways: [""],
    resources: [""],
  });

  const myArticles = [
    {
      id: 1,
      title: "Cambios en la Pubertad: Lo que Necesitas Saber",
      category: "Cuerpo y Desarrollo",
      status: "published",
      views: 1234,
      lastEdited: "Hace 2 días",
    },
    {
      id: 2,
      title: "Métodos Anticonceptivos: Guía Completa",
      category: "Salud Sexual",
      status: "published",
      views: 2103,
      lastEdited: "Hace 1 semana",
    },
    {
      id: 3,
      title: "Salud Menstrual: Mitos y Realidades",
      category: "Cuerpo y Desarrollo",
      status: "draft",
      views: 0,
      lastEdited: "Hace 3 horas",
    },
  ];

  const categories = [
    "Cuerpo y Desarrollo",
    "Consentimiento",
    "Identidad y Género",
    "Relaciones Saludables",
    "Salud Sexual",
    "Derechos Sexuales",
  ];

  const handleAddSection = () => {
    setFormData({
      ...formData,
      sections: [...formData.sections, { title: "", content: "" }],
    });
  };

  const handleAddKeyTakeaway = () => {
    setFormData({
      ...formData,
      keyTakeaways: [...formData.keyTakeaways, ""],
    });
  };

  const handlePublish = () => {
    toast.success("¡Artículo publicado exitosamente!", {
      description: "Tu contenido ya está disponible para la comunidad",
    });
    setView("list");
  };

  const handleSaveDraft = () => {
    toast.success("Borrador guardado", {
      description: "Puedes continuar editando más tarde",
    });
  };

  if (view === "create" || view === "edit") {
    return (
      <div className="min-h-screen bg-background px-6 py-12">
        <div className="mx-auto max-w-5xl">
          {/* Header */}
          <div className="mb-8 flex items-center justify-between">
            <Button
              onClick={() => setView("list")}
              variant="ghost"
              className="gap-2 rounded-[2rem] hover:bg-secondary/30"
            >
              <ArrowLeft className="size-5" />
              Volver a Mis Artículos
            </Button>
            <div className="flex gap-3">
              <Button
                onClick={handleSaveDraft}
                variant="outline"
                className="gap-2 rounded-[2rem] border-2 border-secondary/40 hover:bg-secondary/30"
              >
                Guardar Borrador
              </Button>
              <Button
                onClick={handlePublish}
                className="gap-2 rounded-[2rem] shadow-[0_4px_20px_var(--color-shadow-soft)]"
              >
                <CheckCircle className="size-5" />
                Publicar
              </Button>
            </div>
          </div>

          {/* Form */}
          <Card className="rounded-[3rem] border-2 border-secondary/40 p-8 shadow-[0_8px_40px_var(--color-shadow-soft)] md:p-12">
            <div className="mb-8">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex size-14 items-center justify-center rounded-[2rem] bg-primary/20 text-3xl">
                  📝
                </div>
                <h1>{view === "create" ? "Crear Nuevo Artículo" : "Editar Artículo"}</h1>
              </div>
              <p className="text-muted-foreground">
                Comparte tu conocimiento profesional con la comunidad. Asegúrate de usar lenguaje
                claro, inclusivo y sin tecnicismos innecesarios.
              </p>
            </div>

            <div className="space-y-8">
              {/* Basic Info */}
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Título del Artículo</Label>
                  <Input
                    id="title"
                    placeholder="Ej: Métodos Anticonceptivos: Guía Completa"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="rounded-[2rem] border-2 border-secondary/40 bg-input-background px-6 py-6"
                  />
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="category">Categoría</Label>
                    <select
                      id="category"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full rounded-[2rem] border-2 border-secondary/40 bg-input-background px-6 py-4"
                    >
                      <option value="">Selecciona una categoría</option>
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="readTime">Tiempo de Lectura</Label>
                    <Input
                      id="readTime"
                      placeholder="Ej: 10 min"
                      value={formData.readTime}
                      onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                      className="rounded-[2rem] border-2 border-secondary/40 bg-input-background px-6 py-4"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="excerpt">Resumen (Extracto)</Label>
                  <Textarea
                    id="excerpt"
                    placeholder="Breve descripción que aparecerá en la tarjeta del artículo..."
                    value={formData.excerpt}
                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                    className="min-h-24 rounded-[2rem] border-2 border-secondary/40 bg-input-background px-6 py-4"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="introduction">Introducción</Label>
                  <Textarea
                    id="introduction"
                    placeholder="Párrafo introductorio que contextualiza el tema..."
                    value={formData.introduction}
                    onChange={(e) => setFormData({ ...formData, introduction: e.target.value })}
                    className="min-h-32 rounded-[2rem] border-2 border-secondary/40 bg-input-background px-6 py-4"
                  />
                </div>
              </div>

              {/* Sections */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Secciones del Artículo</Label>
                  <Button
                    type="button"
                    onClick={handleAddSection}
                    variant="outline"
                    size="sm"
                    className="gap-2 rounded-[1.5rem] border-2 border-secondary/40 hover:bg-secondary/30"
                  >
                    <Plus className="size-4" />
                    Agregar Sección
                  </Button>
                </div>

                {formData.sections.map((section, index) => (
                  <div
                    key={index}
                    className="space-y-3 rounded-[2rem] border-2 border-secondary/40 bg-secondary/10 p-6"
                  >
                    <div className="flex items-center justify-between">
                      <h4>Sección {index + 1}</h4>
                      {formData.sections.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            const newSections = formData.sections.filter((_, i) => i !== index);
                            setFormData({ ...formData, sections: newSections });
                          }}
                          className="rounded-[1rem] text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="size-4" />
                        </Button>
                      )}
                    </div>
                    <Input
                      placeholder="Título de la sección"
                      value={section.title}
                      onChange={(e) => {
                        const newSections = [...formData.sections];
                        newSections[index].title = e.target.value;
                        setFormData({ ...formData, sections: newSections });
                      }}
                      className="rounded-[2rem] border-2 border-secondary/40 bg-background px-6 py-4"
                    />
                    <Textarea
                      placeholder="Contenido de la sección..."
                      value={section.content}
                      onChange={(e) => {
                        const newSections = [...formData.sections];
                        newSections[index].content = e.target.value;
                        setFormData({ ...formData, sections: newSections });
                      }}
                      className="min-h-40 rounded-[2rem] border-2 border-secondary/40 bg-background px-6 py-4"
                    />
                  </div>
                ))}
              </div>

              {/* Key Takeaways */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Puntos Clave</Label>
                  <Button
                    type="button"
                    onClick={handleAddKeyTakeaway}
                    variant="outline"
                    size="sm"
                    className="gap-2 rounded-[1.5rem] border-2 border-secondary/40 hover:bg-secondary/30"
                  >
                    <Plus className="size-4" />
                    Agregar Punto
                  </Button>
                </div>

                {formData.keyTakeaways.map((takeaway, index) => (
                  <div key={index} className="flex gap-3">
                    <Input
                      placeholder={`Punto clave ${index + 1}`}
                      value={takeaway}
                      onChange={(e) => {
                        const newTakeaways = [...formData.keyTakeaways];
                        newTakeaways[index] = e.target.value;
                        setFormData({ ...formData, keyTakeaways: newTakeaways });
                      }}
                      className="flex-1 rounded-[2rem] border-2 border-secondary/40 bg-input-background px-6 py-4"
                    />
                    {formData.keyTakeaways.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          const newTakeaways = formData.keyTakeaways.filter(
                            (_, i) => i !== index
                          );
                          setFormData({ ...formData, keyTakeaways: newTakeaways });
                        }}
                        className="rounded-[1rem] text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>

              {/* Guidelines */}
              <div className="rounded-[2rem] border-2 border-primary/40 bg-primary/5 p-6">
                <div className="mb-3 flex items-center gap-2">
                  <AlertCircle className="size-5 text-primary" />
                  <h4>Guía de Contenido</h4>
                </div>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex gap-2">
                    <span>✓</span>
                    <span>Usa lenguaje claro, inclusivo y accesible para adolescentes</span>
                  </li>
                  <li className="flex gap-2">
                    <span>✓</span>
                    <span>Incluye información validada científicamente</span>
                  </li>
                  <li className="flex gap-2">
                    <span>✓</span>
                    <span>Evita tecnicismos; si los usas, explícalos</span>
                  </li>
                  <li className="flex gap-2">
                    <span>✓</span>
                    <span>Mantén un tono empático y sin juicios</span>
                  </li>
                  <li className="flex gap-2">
                    <span>✓</span>
                    <span>Cita fuentes confiables cuando sea relevante</span>
                  </li>
                </ul>
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background px-6 py-12">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <Button
            onClick={onBack}
            variant="ghost"
            className="gap-2 rounded-[2rem] hover:bg-secondary/30"
          >
            <ArrowLeft className="size-5" />
            Volver al Dashboard
          </Button>
          <Button
            onClick={() => setView("create")}
            className="gap-2 rounded-[2rem] shadow-[0_4px_20px_var(--color-shadow-soft)]"
          >
            <Plus className="size-5" />
            Crear Artículo
          </Button>
        </div>

        {/* Title */}
        <div className="mb-12 text-center">
          <div className="mb-4 flex justify-center">
            <div className="flex size-16 items-center justify-center rounded-[2rem] bg-primary/20 text-4xl">
              📚
            </div>
          </div>
          <h1 className="mb-4">Gestión de Biblioteca</h1>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Crea, edita y administra el contenido educativo. Cada artículo que publicas ayuda a
            miles de adolescentes a aprender sobre ESI.
          </p>
        </div>

        {/* My Articles */}
        <div className="space-y-6">
          <h2>Mis Artículos</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {myArticles.map((article) => (
              <Card
                key={article.id}
                className="group cursor-pointer overflow-hidden rounded-[2.5rem] border-2 border-secondary/40 transition-all hover:scale-105 hover:shadow-[0_16px_50px_var(--color-shadow-soft)]"
              >
                <div className="p-6">
                  <div className="mb-4 flex items-start justify-between">
                    <Badge
                      className={`rounded-[1rem] ${
                        article.status === "published"
                          ? "border-primary/40 bg-primary/20 text-primary"
                          : "border-secondary/40 bg-secondary/30 text-muted-foreground"
                      }`}
                    >
                      {article.status === "published" ? "Publicado" : "Borrador"}
                    </Badge>
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-8 rounded-[1rem] hover:bg-secondary/30"
                        onClick={(e) => {
                          e.stopPropagation();
                          toast.info("Vista previa del artículo");
                        }}
                      >
                        <Eye className="size-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-8 rounded-[1rem] hover:bg-secondary/30"
                        onClick={(e) => {
                          e.stopPropagation();
                          setView("edit");
                        }}
                      >
                        <FileEdit className="size-4" />
                      </Button>
                    </div>
                  </div>
                  <h3 className="mb-2 line-clamp-2">{article.title}</h3>
                  <div className="mb-4 text-sm text-muted-foreground">{article.category}</div>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Eye className="size-4" />
                      <span>{article.views} vistas</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="size-4" />
                      <span>{article.lastEdited}</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
