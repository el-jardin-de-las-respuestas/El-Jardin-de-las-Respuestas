import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Target, Users, Heart, Shield } from 'lucide-react';

export function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <h1>Acerca de El Jardín de las Respuestas</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Somos una plataforma dedicada a promover la educación sexual integral, 
            brindando información confiable y accesible para todas las mujeres.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-12">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <Target className="h-8 w-8 text-pink-500" />
                <CardTitle>Nuestra Misión</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Proporcionar educación sexual integral de calidad, basada en evidencia científica,
                que empodere a las mujeres para tomar decisiones informadas sobre su salud sexual 
                y reproductiva.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <Heart className="h-8 w-8 text-pink-500" />
                <CardTitle>Nuestra Visión</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Un mundo donde todas las mujeres tengan acceso a información clara, científica 
                y sin prejuicios sobre su cuerpo, sexualidad y derechos reproductivos.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <Users className="h-8 w-8 text-pink-500" />
                <CardTitle>Comunidad</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Creamos un espacio seguro donde las mujeres pueden aprender, compartir 
                experiencias y encontrar apoyo en temas relacionados con la salud sexual integral.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <Shield className="h-8 w-8 text-pink-500" />
                <CardTitle>Compromiso</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Nos comprometemos a mantener la privacidad de nuestras usuarias y a proporcionar
                información verificada por profesionales de la salud.
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-8 bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-950/20 dark:to-purple-950/20 border-pink-200 dark:border-pink-900">
          <CardContent className="pt-6">
            <h3 className="mb-4">¿Por qué es importante la ESI?</h3>
            <div className="space-y-3 text-muted-foreground">
              <p>
                La Educación Sexual Integral es un derecho reconocido internacionalmente y es 
                fundamental para el desarrollo saludable de las personas. La ESI no solo habla 
                de biología, sino que aborda aspectos emocionales, sociales y éticos de la sexualidad.
              </p>
              <p>
                Contar con información confiable permite tomar decisiones responsables, prevenir 
                situaciones de riesgo, y ejercer plenamente los derechos sexuales y reproductivos.
              </p>
              <p>
                Nuestro objetivo es que cada mujer tenga acceso a esta información esencial, 
                presentada de manera clara, respetuosa y científicamente rigurosa.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
