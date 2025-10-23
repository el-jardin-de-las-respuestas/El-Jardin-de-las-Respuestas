import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { toast } from 'sonner';

interface ProfessionalRegistrationPageProps {
  onNavigate?: (page: string) => void;
}

export function ProfessionalRegistrationPage({ onNavigate }: ProfessionalRegistrationPageProps) {
  const [formData, setFormData] = useState({
    email: '',
    age: '',
    password: '',
    confirmPassword: '',
    specialty: '',
    certification: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validaciones
    if (formData.password !== formData.confirmPassword) {
      toast.error('Las contraseñas no coinciden');
      setIsSubmitting(false);
      return;
    }

    if (parseInt(formData.age) < 18) {
      toast.error('Debes ser mayor de 18 años para registrarte como profesional');
      setIsSubmitting(false);
      return;
    }

    if (!formData.specialty.trim() || !formData.certification.trim()) {
      toast.error('Por favor completa todos los campos');
      setIsSubmitting(false);
      return;
    }

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));

      console.log('Datos del formulario:', formData);

      toast.success('¡Registro exitoso! Tu información será verificada por nuestro equipo.');

      setFormData({
        email: '',
        age: '',
        password: '',
        confirmPassword: '',
        specialty: '',
        certification: ''
      });

      setTimeout(() => {
        if (onNavigate) {
          onNavigate('home');
        }
      }, 2000);

    } catch (error) {
      console.error('Error al registrar:', error);
      toast.error('Hubo un error al procesar tu registro. Intenta nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 py-8">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-pink-100 dark:bg-pink-900 rounded-2xl flex items-center justify-center">
              <span className="text-3xl">🌸</span>
            </div>
          </div>

          <div>
            <CardTitle className="text-2xl">El Jardín de las Respuestas</CardTitle>
            <p className="text-sm text-muted-foreground mt-2">Únete como Voluntario</p>
            <p className="text-xs text-muted-foreground">Profesionales que transforman vidas</p>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Correo Electrónico */}
            <div className="space-y-2">
              <Label htmlFor="email">Correo Electrónico</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="tu@email.com"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={isSubmitting}
              />
            </div>

            {/* Edad */}
            <div className="space-y-2">
              <Label htmlFor="age">Edad</Label>
              <Input
                id="age"
                name="age"
                type="number"
                placeholder="Tu edad"
                value={formData.age}
                onChange={handleChange}
                required
                min="18"
                disabled={isSubmitting}
              />
              <p className="text-xs text-muted-foreground">
                Debes ser mayor de 18 años para registrarte como profesional
              </p>
            </div>

            {/* Contraseña */}
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={6}
                disabled={isSubmitting}
              />
            </div>

            {/* Confirmar Contraseña */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                minLength={6}
                disabled={isSubmitting}
              />
            </div>

            {/* Especialidad */}
            <div className="space-y-2">
              <Label htmlFor="specialty">Especialidad</Label>
              <Input
                id="specialty"
                name="specialty"
                type="text"
                placeholder="Ej: Ginecología, Docente ESI Certificado"
                value={formData.specialty}
                onChange={handleChange}
                required
                disabled={isSubmitting}
              />
            </div>

            {/* Matrícula o Certificación */}
            <div className="space-y-2">
              <Label htmlFor="certification">Matrícula o Certificación</Label>
              <Textarea
                id="certification"
                name="certification"
                placeholder="Número de matrícula o certificación profesional"
                value={formData.certification}
                onChange={handleChange}
                required
                disabled={isSubmitting}
                className="min-h-[80px] resize-none"
              />
              <p className="text-xs text-muted-foreground">
                Verificaremos tus credenciales para garantizar la calidad del contenido
              </p>
            </div>

            {/* Botón de registro */}
            <Button
              type="submit"
              className="w-full bg-pink-600 hover:bg-pink-700"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Registrando...' : 'Registrarse como Voluntario'}
            </Button>
          </form>

          {/* Ya tienes cuenta / Eres estudiante */}
          <div className="mt-6 text-center space-y-3">
            <p className="text-sm text-muted-foreground">
              ¿Eres estudiante?{' '}
              <button
                onClick={() => onNavigate && onNavigate('auth')}
                className="text-pink-600 hover:text-pink-700 dark:text-pink-400 dark:hover:text-pink-300 font-medium hover:underline"
                disabled={isSubmitting}
              >
                Regístrate como usuario
              </button>
            </p>

            <p className="text-sm text-muted-foreground">
              ¿Ya tienes cuenta?{' '}
              <button
                onClick={() => onNavigate && onNavigate('professional-login')}  // ✅ CORRECTO
                className="text-pink-600 hover:text-pink-700 dark:text-pink-400 dark:hover:text-pink-300 font-medium hover:underline"
                disabled={isSubmitting}
              >
                Ingresa aquí
              </button>
            </p>
          </div>

          {/* Modal informativo */}
          <div className="mt-6 p-6 bg-gradient-to-br from-pink-50 to-purple-50 dark:from-pink-950/20 dark:to-purple-950/20 rounded-2xl border border-pink-200 dark:border-pink-800">
            <div className="flex items-start gap-3 mb-3">
              <span className="text-2xl">🌸</span>
              <h3 className="font-semibold text-lg text-pink-700 dark:text-pink-400">
                ¿Por qué ser voluntario?
              </h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Como profesional de la salud o docente ESI certificado, tendrás la oportunidad de crear
              contenido educativo validado, responder consultas en el chat confidencial, moderar el
              foro comunitario y contribuir a crear un espacio seguro de aprendizaje para adolescentes.
              Tu conocimiento puede cambiar vidas.
            </p>
          </div>

          {/* Nota informativa */}
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-900">
            <p className="text-xs text-muted-foreground">
              <strong>Nota:</strong> Tu información será verificada por nuestro equipo antes de aprobar tu cuenta como profesional.
            </p>
          </div>

          {/* Botón para volver */}
          {onNavigate && (
            <Button
              type="button"
              variant="ghost"
              className="w-full mt-4"
              onClick={() => onNavigate('home')}
              disabled={isSubmitting}
            >
              Volver al inicio
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}