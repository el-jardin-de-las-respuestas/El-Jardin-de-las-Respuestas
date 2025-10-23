import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { ExternalLink, Download, Phone, MapPin, Book } from 'lucide-react';

export function ResourcesPage() {
  const emergencyContacts = [
    { name: 'Línea Salud Sexual', phone: '0800-222-3444', description: 'Orientación gratuita y confidencial' },
    { name: 'Violencia de Género', phone: '144', description: 'Atención 24/7' },
    { name: 'Salud Mental', phone: '0800-999-0091', description: 'Apoyo psicológico' },
  ];

  const healthCenters = [
    'Hospitales públicos con servicios de ginecología',
    'Centros de salud barriales',
    'Consejerías en salud sexual y reproductiva',
    'Centros de planificación familiar',
  ];

    const downloadableResources = [
      {
        title: 'Guía de Métodos Anticonceptivos',
        type: 'PDF',
        size: '2.5 MB',
        url: '/downloads/Metodos_anticonceptivos_Guia_practica_para_profesionales_de_la_salud_MSAL.pdf',
      },
      {
        title: 'Manual de Derechos Sexuales',
        type: 'PDF',
        size: '1.8 MB',
        url: '/downloads/Manual_Derechos_Sexuales.pdf', // ✅ versión local
      },
      {
        title: 'Calendario Menstrual Imprimible',
        type: 'PDF',
        size: '500 KB',
        url: '/downloads/calendario-menstrual.pdf',
      },
      {
        title: 'Guía de Prevención de ITS',
        type: 'PDF',
        size: '3.2 MB',
        url: 'https://www.argentina.gob.ar/sites/default/files/bancos/2022-08/Prevencion_combinada_del_VIH_y_las_ITS.pdf',
      },
    ];


  const externalLinks = [
    { name: 'Ministerio de Salud', url: 'https://www.argentina.gob.ar/salud', description: 'Información oficial sobre salud sexual' },
    { name: 'Portal ESI', url: 'https://www.argentina.gob.ar/educacion/esi', description: 'Recursos educativos del Ministerio de Educación' },
    { name: 'OMS - Salud Sexual', url: 'https://www.who.int', description: 'Guías internacionales de salud sexual' },
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <h1>Recursos y Apoyo</h1>
        <p className="text-muted-foreground mt-2">
          Accede a contactos de ayuda, material descargable y enlaces útiles
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Emergency Contacts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="h-5 w-5 text-red-500" />
              Líneas de Ayuda
            </CardTitle>
            <CardDescription>Contactos de emergencia y orientación</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {emergencyContacts.map((contact, index) => (
              <div key={index} className="border-l-4 border-red-500 pl-4 py-2">
                <h4>{contact.name}</h4>
                <p className="text-lg text-primary">{contact.phone}</p>
                <p className="text-sm text-muted-foreground">{contact.description}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Health Centers */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-blue-500" />
              Centros de Atención
            </CardTitle>
            <CardDescription>Dónde acudir para recibir atención</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {healthCenters.map((center, index) => (
                <li key={index} className="flex items-start gap-2">
                  <MapPin className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <span>{center}</span>
                </li>
              ))}
            </ul>
            <p className="text-sm text-muted-foreground mt-4 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
              Todos estos servicios son gratuitos y confidenciales. No necesitas autorización de terceros para acceder a ellos.
            </p>
          </CardContent>
        </Card>

        {/* Downloadable Resources */}
<Card>
  <CardHeader>
    <CardTitle className="flex items-center gap-2">
      <Download className="h-5 w-5 text-green-500" />
      Material Descargable
    </CardTitle>
    <CardDescription>Guías y recursos en formato PDF</CardDescription>
  </CardHeader>
      <CardContent className="space-y-3">
        {downloadableResources.map((resource, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Book className="h-5 w-5 text-green-500" />
              <div>
                <p>{resource.title}</p>
                <p className="text-xs text-muted-foreground">
                  {resource.type} • {resource.size}
                </p>
              </div>
            </div>
            <Button asChild size="sm" variant="ghost">
              <a
                href={resource.url}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center"
              >
                <Download className="h-4 w-4" />
              </a>
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>

        {/* External Links */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ExternalLink className="h-5 w-5 text-purple-500" />
              Enlaces Útiles
            </CardTitle>
            <CardDescription>Sitios web de referencia</CardDescription>
          </CardHeader>
         <CardContent className="space-y-3">
            {externalLinks.map((link, index) => (
              <div key={index} className="border-l-2 border-purple-500 pl-4 py-2">
                <h4 className="flex items-center gap-2">
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-purple-600 hover:underline"
                  >
                    {link.name}
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </h4>
                <p className="text-sm text-muted-foreground">{link.description}</p>
              </div>
            ))}
        </CardContent>

        </Card>
      </div>

      {/* Important Notice */}
      <Card className="mt-6 bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-950/20 dark:to-purple-950/20 border-pink-200 dark:border-pink-900">
        <CardContent className="pt-6">
          <h3 className="mb-3">Información Importante</h3>
          <div className="space-y-2 text-muted-foreground">
            <p>
              • Todos los servicios de salud sexual y reproductiva son confidenciales y no requieren autorización de terceros.
            </p>
            <p>
              • Si eres menor de edad, tienes derecho a recibir atención sin necesidad de acompañamiento de un adulto.
            </p>
            <p>
              • Los métodos anticonceptivos son gratuitos en hospitales y centros de salud públicos.
            </p>
            <p>
              • Ante cualquier situación de violencia o abuso, existen líneas de ayuda disponibles las 24 horas.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
