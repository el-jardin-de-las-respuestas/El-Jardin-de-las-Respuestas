import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { HelpCircle, Search } from 'lucide-react';
import { useState } from 'react';

export function FAQPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const faqCategories = [
    {
      category: 'Uso de la Plataforma',
      questions: [
        {
          question: '¿Cómo me registro en El Jardín de las Respuestas?',
          answer: 'Haz clic en el botón "Ingresar" en la parte superior derecha de la página. Luego selecciona "Crear cuenta" y completa el formulario con tu email y contraseña. Tu privacidad es importante para nosotros y tus datos están protegidos.',
        },
        {
          question: '¿Es gratuito usar la plataforma?',
          answer: 'Sí, El Jardín de las Respuestas es completamente gratuito. Creemos que el acceso a información de salud sexual debe ser un derecho para todas.',
        },
        {
          question: '¿Mi información es confidencial?',
          answer: 'Absolutamente. Respetamos tu privacidad y no compartimos tu información personal con terceros. Puedes usar la plataforma de forma anónima si lo prefieres.',
        },
      ],
    },
    {
      category: 'Salud Sexual y Reproductiva',
      questions: [
        {
          question: '¿Cuándo debo hacerme un chequeo ginecológico?',
          answer: 'Se recomienda realizar un chequeo ginecológico anual a partir del inicio de la vida sexual o desde los 21 años. Si tienes síntomas inusuales, consulta antes con un profesional.',
        },
        {
          question: '¿Qué método anticonceptivo es mejor para mí?',
          answer: 'No hay un método "mejor" universal. Depende de tu edad, estilo de vida, historial médico y preferencias. Te recomendamos revisar nuestro catálogo de anticonceptivos y consultar con un profesional de la salud.',
        },
        {
          question: '¿Es normal tener dolor durante la menstruación?',
          answer: 'Molestias leves son comunes, pero dolor intenso que interfiere con tus actividades diarias no es normal y debe ser evaluado por un médico. Podría indicar condiciones como endometriosis.',
        },
        {
          question: '¿Qué hacer si olvidé tomar la píldora anticonceptiva?',
          answer: 'Depende de cuántas horas han pasado y qué semana del ciclo estés. Consulta el prospecto de tu píldora específica o comunícate con tu médico. Mientras tanto, usa protección adicional.',
        },
      ],
    },
    {
      category: 'Derechos y Acceso a Servicios',
      questions: [
        {
          question: '¿Necesito autorización de alguien para recibir atención ginecológica?',
          answer: 'No. Tienes derecho a recibir atención médica en salud sexual y reproductiva sin necesidad de autorización de padres, tutores o pareja, independientemente de tu edad.',
        },
        {
          question: '¿Los anticonceptivos son gratuitos en Argentina?',
          answer: 'Sí. Todos los métodos anticonceptivos están disponibles de forma gratuita en hospitales públicos y centros de salud. Es parte del Programa Nacional de Salud Sexual y Procreación Responsable.',
        },
        {
          question: '¿Qué es la Ley de Educación Sexual Integral (ESI)?',
          answer: 'Es una ley nacional que establece el derecho de todos los estudiantes a recibir educación sexual integral en las escuelas. Abarca aspectos biológicos, psicológicos, sociales, éticos y legales de la sexualidad.',
        },
      ],
    },
    {
      category: 'Emergencias y Situaciones Urgentes',
      questions: [
        {
          question: '¿Qué es la anticoncepción de emergencia y cómo funciona?',
          answer: 'Es un método anticonceptivo de uso ocasional que previene el embarazo después de una relación sexual sin protección. Debe tomarse lo antes posible (idealmente dentro de las 72 horas). Es gratuito en centros de salud.',
        },
        {
          question: '¿Dónde puedo obtener ayuda si sufrí violencia sexual?',
          answer: 'Línea 144 (atención 24/7 para situaciones de violencia de género). También puedes acudir a cualquier hospital público donde recibirás atención médica, psicológica y legal de forma gratuita y confidencial.',
        },
        {
          question: '¿Qué hago si creo que tengo una ITS?',
          answer: 'No te autodiagnostiques. Acude a un centro de salud para realizarte pruebas. Muchas ITS son tratables si se detectan temprano. Los testeos son gratuitos en hospitales públicos.',
        },
      ],
    },
    {
      category: 'Comunidad y Contenido',
      questions: [
        {
          question: '¿Puedo confiar en la información del blog?',
          answer: 'Sí. Todos nuestros artículos son escritos o revisados por profesionales de la salud certificados. Citamos fuentes científicas y actualizamos el contenido regularmente.',
        },
        {
          question: '¿Cómo puedo participar en la comunidad?',
          answer: 'Una vez registrada, puedes acceder a la sección Comunidad donde podrás hacer preguntas, compartir experiencias y apoyar a otras mujeres. Recuerda seguir nuestras normas de respeto y empatía.',
        },
        {
          question: '¿La comunidad sustituye el consejo médico?',
          answer: 'No. La comunidad es un espacio de apoyo y compartir experiencias, pero no sustituye la consulta con profesionales de la salud. Ante cualquier duda médica, consulta con un especialista.',
        },
      ],
    },
  ];

  const filteredFAQs = faqCategories.map(cat => ({
    ...cat,
    questions: cat.questions.filter(q =>
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  })).filter(cat => cat.questions.length > 0);

  const totalQuestions = faqCategories.reduce((sum, cat) => sum + cat.questions.length, 0);

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8 text-center">
        <div className="flex justify-center mb-4">
          <div className="p-3 rounded-full bg-pink-100 dark:bg-pink-900/20">
            <HelpCircle className="h-8 w-8 text-pink-600 dark:text-pink-400" />
          </div>
        </div>
        <h1>Preguntas Frecuentes</h1>
        <p className="text-muted-foreground mt-2">
          Encuentra respuestas rápidas a las preguntas más comunes
        </p>
        <Badge variant="secondary" className="mt-4">
          {totalQuestions} preguntas respondidas
        </Badge>
      </div>

      {/* Search */}
      <Card className="mb-8">
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar en las preguntas frecuentes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* FAQ Sections */}
      <div className="space-y-6">
        {filteredFAQs.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">
                No se encontraron preguntas con esa búsqueda. Intenta con otros términos.
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredFAQs.map((category, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{category.category}</CardTitle>
                <CardDescription>{category.questions.length} preguntas</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {category.questions.map((faq, faqIndex) => (
                    <AccordionItem key={faqIndex} value={`item-${index}-${faqIndex}`}>
                      <AccordionTrigger className="text-left">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Contact Card */}
      <Card className="mt-8 bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-950/20 dark:to-purple-950/20 border-pink-200 dark:border-pink-900">
        <CardContent className="py-8 text-center">
          <h3 className="mb-3">¿No encontraste lo que buscabas?</h3>
          <p className="text-muted-foreground mb-4">
            Puedes preguntar en nuestra comunidad o contactarnos directamente.
            Nuestro equipo de profesionales está aquí para ayudarte.
          </p>
          <div className="flex gap-3 justify-center text-sm">
            <span className="text-muted-foreground">📧 contacto@eljardinrespuestas.com</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
