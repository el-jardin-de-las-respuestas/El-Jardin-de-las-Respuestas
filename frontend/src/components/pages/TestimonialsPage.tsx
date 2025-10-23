import { Card, CardContent, CardHeader } from '../ui/card';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Quote, Star } from 'lucide-react';
import { Badge } from '../ui/badge';

export function TestimonialsPage() {
  const testimonials = [
    {
      name: 'Valentina R.',
      initials: 'VR',
      age: 28,
      location: 'Buenos Aires',
      rating: 5,
      text: 'Esta plataforma cambió mi vida. Finalmente encontré información confiable sobre métodos anticonceptivos sin sesgos. Pude tomar decisiones informadas sobre mi salud reproductiva.',
      topic: 'Anticonceptivos',
      date: 'Octubre 2025',
    },
    {
      name: 'Camila S.',
      initials: 'CS',
      age: 23,
      location: 'Córdoba',
      rating: 5,
      text: 'La sección de derechos sexuales me ayudó a entender que tengo voz en mis decisiones médicas. Me sentí empoderada para hablar con mi ginecóloga sobre mis preferencias.',
      topic: 'Derechos',
      date: 'Septiembre 2025',
    },
    {
      name: 'Lucía M.',
      initials: 'LM',
      age: 31,
      location: 'Rosario',
      rating: 5,
      text: 'Sufría de endometriosis y no sabía qué hacer. Los artículos del blog me guiaron hacia el tratamiento correcto y encontré apoyo en la comunidad. Eternamente agradecida.',
      topic: 'Salud Reproductiva',
      date: 'Agosto 2025',
    },
    {
      name: 'Martina P.',
      initials: 'MP',
      age: 25,
      location: 'Mendoza',
      rating: 5,
      text: 'El rastreador de ciclo menstrual es increíble. Me ayudó a entender mi cuerpo y detectar patrones que luego discutí con mi médica. Una herramienta invaluable.',
      topic: 'Ciclo Menstrual',
      date: 'Octubre 2025',
    },
    {
      name: 'Sofía L.',
      initials: 'SL',
      age: 20,
      location: 'La Plata',
      rating: 5,
      text: 'Como estudiante universitaria, necesitaba información clara sobre salud sexual. Este sitio me dio todo lo que necesitaba de forma accesible y sin prejuicios.',
      topic: 'Educación Sexual',
      date: 'Septiembre 2025',
    },
    {
      name: 'Florencia G.',
      initials: 'FG',
      age: 35,
      location: 'Salta',
      rating: 5,
      text: 'La comunidad es un espacio seguro donde pude compartir mis miedos sobre ser madre. Las respuestas y el apoyo que recibí fueron increíbles.',
      topic: 'Comunidad',
      date: 'Agosto 2025',
    },
    {
      name: 'Catalina B.',
      initials: 'CB',
      age: 27,
      location: 'Tucumán',
      rating: 5,
      text: 'Los recursos sobre prevención de ITS son completos y actualizados. Me siento más segura y preparada para cuidar mi salud sexual.',
      topic: 'Prevención',
      date: 'Octubre 2025',
    },
    {
      name: 'Agustina F.',
      initials: 'AF',
      age: 29,
      location: 'Neuquén',
      rating: 5,
      text: 'Gracias a esta plataforma aprendí sobre mis derechos reproductivos y pude acceder a atención médica gratuita. ¡No sabía que existían estos servicios!',
      topic: 'Recursos',
      date: 'Septiembre 2025',
    },
  ];

  const stats = [
    { number: '10,000+', label: 'Mujeres ayudadas' },
    { number: '4.9/5', label: 'Calificación promedio' },
    { number: '95%', label: 'Recomendarían el sitio' },
    { number: '2,500+', label: 'Testimonios recibidos' },
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8 text-center">
        <h1>Testimonios</h1>
        <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
          Historias reales de mujeres que encontraron información, apoyo y empoderamiento
          en El Jardín de las Respuestas
        </p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {stats.map((stat, index) => (
          <Card key={index} className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl text-pink-600 dark:text-pink-400 mb-1">
                {stat.number}
              </div>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Testimonials Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {testimonials.map((testimonial, index) => (
          <Card key={index} className="relative">
            <CardHeader>
              <div className="flex items-start gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-pink-100 dark:bg-pink-900 text-pink-700 dark:text-pink-300">
                    {testimonial.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4>{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.age} años • {testimonial.location}
                      </p>
                    </div>
                    <Quote className="h-8 w-8 text-pink-200 dark:text-pink-900 opacity-50" />
                  </div>
                  <div className="flex gap-1 mt-2">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-muted-foreground italic">"{testimonial.text}"</p>
              <div className="flex items-center justify-between pt-3 border-t">
                <Badge variant="secondary">{testimonial.topic}</Badge>
                <span className="text-xs text-muted-foreground">{testimonial.date}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* CTA Section */}
      <Card className="mt-12 bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-950/20 dark:to-purple-950/20 border-pink-200 dark:border-pink-900">
        <CardContent className="py-12 text-center">
          <h2 className="mb-4">¿Tienes una historia que compartir?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            Tu experiencia puede ayudar a otras mujeres. Si El Jardín de las Respuestas
            te ayudó de alguna manera, nos encantaría conocer tu historia.
          </p>
          <p className="text-sm text-muted-foreground">
            Todos los testimonios son anónimos y verificados para proteger tu privacidad.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
