import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { 
  Heart, 
  Shield, 
  Pill, 
  Phone, 
  Book, 
  AlertCircle,
  CheckCircle,
  Info
} from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';

export function CatalogsPage() {
  const [activeTab, setActiveTab] = useState('reproductive');

  const reproductiveHealth = [
    {
      title: 'Ciclo Menstrual',
      description: 'Comprende las fases de tu ciclo y qué es normal.',
      items: [
        'Fase menstrual: 3-7 días de sangrado',
        'Fase folicular: preparación del óvulo',
        'Ovulación: liberación del óvulo (día 14 aprox.)',
        'Fase lútea: preparación para posible embarazo',
      ],
    },
    {
      title: 'Síntomas y Señales de Alerta',
      description: 'Cuándo consultar con un profesional.',
      items: [
        'Dolor menstrual intenso que interfiere con actividades diarias',
        'Sangrado abundante (más de 80ml por ciclo)',
        'Ciclos irregulares sin razón aparente',
        'Dolor durante las relaciones sexuales',
      ],
    },
    {
      title: 'Cuidados Básicos',
      description: 'Recomendaciones para tu bienestar.',
      items: [
        'Mantener una higiene íntima adecuada',
        'Realizar chequeos ginecológicos anuales',
        'Conocer tu cuerpo y sus cambios',
        'Llevar un registro de tu ciclo menstrual',
      ],
    },
  ];

  const rights = [
    {
      title: 'Derechos Sexuales',
      items: [
        'Derecho a la información sexual veraz y científica',
        'Derecho a la autonomía sexual',
        'Derecho a la privacidad sexual',
        'Derecho a la expresión sexual',
        'Derecho a la libre asociación sexual',
      ],
    },
    {
      title: 'Derechos Reproductivos',
      items: [
        'Derecho a decidir sobre la reproducción',
        'Derecho a servicios de salud reproductiva',
        'Derecho a la planificación familiar',
        'Derecho a la información sobre métodos anticonceptivos',
        'Derecho a la atención durante el embarazo y parto',
      ],
    },
    {
      title: 'Protección Legal',
      items: [
        'Ley de Educación Sexual Integral',
        'Derecho a la interrupción legal del embarazo',
        'Protección contra la discriminación',
        'Acceso gratuito a métodos anticonceptivos',
      ],
    },
  ];

  const contraceptives = [
    {
      name: 'Preservativo',
      effectiveness: '98%',
      type: 'Barrera',
      pros: ['Previene ITS', 'Sin hormonas', 'Fácil acceso'],
      cons: ['Requiere uso correcto', 'Puede romperse'],
    },
    {
      name: 'Anticonceptivos orales',
      effectiveness: '99%',
      type: 'Hormonal',
      pros: ['Muy efectivo', 'Regula el ciclo', 'Reduce acné'],
      cons: ['Requiere receta', 'Toma diaria', 'Posibles efectos secundarios'],
    },
    {
      name: 'DIU',
      effectiveness: '99%',
      type: 'Intrauterino',
      pros: ['Larga duración (3-10 años)', 'Muy efectivo', 'Bajo mantenimiento'],
      cons: ['Requiere colocación médica', 'Costo inicial', 'Posibles cólicos'],
    },
    {
      name: 'Implante subdérmico',
      effectiveness: '99%',
      type: 'Hormonal',
      pros: ['3 años de duración', 'Muy efectivo', 'Discreto'],
      cons: ['Requiere colocación médica', 'Posibles irregularidades menstruales'],
    },
    {
      name: 'Inyectable mensual',
      effectiveness: '96%',
      type: 'Hormonal',
      pros: ['Efectivo', 'Aplicación mensual', 'Regula ciclo'],
      cons: ['Requiere receta', 'Aplicación periódica'],
    },
  ];

  const resources = [
    {
      category: 'Líneas de ayuda',
      items: [
        { name: 'Salud Sexual 0800-222-3444', description: 'Asesoramiento gratuito y confidencial' },
        { name: 'Violencia de Género 144', description: 'Atención 24/7 en todo el país' },
        { name: 'Salud Mental 0800-999-0091', description: 'Apoyo psicológico gratuito' },
      ],
    },
    {
      category: 'Centros de Salud',
      items: [
        { name: 'Hospitales públicos', description: 'Atención gratuita en salud sexual y reproductiva' },
        { name: 'Centros de salud comunitarios', description: 'Consejería y métodos anticonceptivos' },
        { name: 'Consejerías en salud sexual', description: 'Información y orientación personalizada' },
      ],
    },
    {
      category: 'Recursos online',
      items: [
        { name: 'Portal ESI', description: 'Recursos educativos del Ministerio de Educación' },
        { name: 'Guías de salud sexual', description: 'Material descargable y actualizado' },
        { name: 'Foros de apoyo', description: 'Comunidades de mujeres compartiendo experiencias' },
      ],
    },
  ];

  const education = [
    {
      question: '¿Qué es la ESI?',
      answer: 'La Educación Sexual Integral es un espacio sistemático de enseñanza-aprendizaje que promueve saberes y habilidades para la toma de decisiones conscientes y críticas en relación con el cuidado del propio cuerpo, las relaciones interpersonales, el ejercicio de la sexualidad y los derechos.',
    },
    {
      question: '¿Qué son las ITS y cómo prevenirlas?',
      answer: 'Las Infecciones de Transmisión Sexual (ITS) son infecciones que se transmiten principalmente por contacto sexual. La prevención incluye el uso correcto del preservativo, realizarse chequeos regulares, comunicación con la pareja y vacunación cuando esté disponible (como HPV).',
    },
    {
      question: '¿Cómo usar correctamente el preservativo?',
      answer: 'Verificar la fecha de vencimiento, abrir con cuidado sin usar dientes o tijeras, colocarlo antes de cualquier contacto genital, presionar la punta para sacar el aire, desenrollar hasta la base, y después de la eyaculación retirar sujetando la base antes de que se pierda la erección.',
    },
    {
      question: '¿Qué es el consentimiento?',
      answer: 'El consentimiento es un acuerdo libre, voluntario, consciente y específico para realizar una actividad sexual. Debe ser claro, puede retirarse en cualquier momento, y no puede darse bajo presión, amenaza, o cuando la persona está bajo efectos de sustancias.',
    },
    {
      question: '¿Cuándo hacerse un test de embarazo?',
      answer: 'Se recomienda realizar un test de embarazo cuando hay un retraso menstrual de al menos una semana, o 2-3 semanas después de una relación sexual sin protección. Los tests caseros son confiables si se siguen las instrucciones correctamente.',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <h1>Catálogos de Información</h1>
        <p className="text-muted-foreground mt-2">
          Explora diferentes áreas de la educación sexual integral
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 h-auto gap-2">
          <TabsTrigger value="reproductive" className="flex items-center gap-2">
            <Heart className="h-4 w-4" />
            <span className="hidden sm:inline">Salud Reproductiva</span>
            <span className="sm:hidden">Salud</span>
          </TabsTrigger>
          <TabsTrigger value="rights" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            <span className="hidden sm:inline">Derechos</span>
            <span className="sm:hidden">Derechos</span>
          </TabsTrigger>
          <TabsTrigger value="contraceptives" className="flex items-center gap-2">
            <Pill className="h-4 w-4" />
            <span className="hidden sm:inline">Anticonceptivos</span>
            <span className="sm:hidden">Métodos</span>
          </TabsTrigger>
          <TabsTrigger value="resources" className="flex items-center gap-2">
            <Phone className="h-4 w-4" />
            <span className="hidden sm:inline">Recursos</span>
            <span className="sm:hidden">Recursos</span>
          </TabsTrigger>
          <TabsTrigger value="education" className="flex items-center gap-2">
            <Book className="h-4 w-4" />
            <span className="hidden sm:inline">Educación</span>
            <span className="sm:hidden">Educación</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="reproductive" className="mt-6 space-y-6">
          {reproductiveHealth.map((section, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{section.title}</CardTitle>
                <CardDescription>{section.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {section.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="rights" className="mt-6 space-y-6">
          {rights.map((section, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-blue-500" />
                  {section.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {section.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="contraceptives" className="mt-6 space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            {contraceptives.map((method, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>{method.name}</CardTitle>
                    <Badge variant="secondary">{method.effectiveness}</Badge>
                  </div>
                  <CardDescription>Tipo: {method.type}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="text-sm mb-2 text-green-600 dark:text-green-400 flex items-center gap-1">
                      <CheckCircle className="h-4 w-4" />
                      Ventajas
                    </h4>
                    <ul className="space-y-1 text-sm">
                      {method.pros.map((pro, i) => (
                        <li key={i} className="text-muted-foreground">• {pro}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm mb-2 text-orange-600 dark:text-orange-400 flex items-center gap-1">
                      <AlertCircle className="h-4 w-4" />
                      Consideraciones
                    </h4>
                    <ul className="space-y-1 text-sm">
                      {method.cons.map((con, i) => (
                        <li key={i} className="text-muted-foreground">• {con}</li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900">
            <CardContent className="pt-6">
              <div className="flex gap-3">
                <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                <div className="space-y-1">
                  <p className="text-sm">
                    <strong>Importante:</strong> Consulta siempre con un profesional de la salud para elegir el método más adecuado para ti. Muchos métodos anticonceptivos son gratuitos en hospitales y centros de salud públicos.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resources" className="mt-6 space-y-6">
          {resources.map((category, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="h-5 w-5 text-purple-500" />
                  {category.category}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {category.items.map((item, i) => (
                    <div key={i} className="border-l-2 border-purple-500 pl-4 py-2">
                      <h4>{item.name}</h4>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="education" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Preguntas Frecuentes</CardTitle>
              <CardDescription>
                Respuestas a las consultas más comunes sobre educación sexual integral
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {education.map((item, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger>{item.question}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
