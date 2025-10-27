import { useState } from 'react';

interface ProfessionalLoginPageProps {
  onNavigate?: (page: string, id?: number) => void;
  onProfessionalLogin?: () => void;
}

export function ProfessionalLoginPage({ onNavigate, onProfessionalLogin }: ProfessionalLoginPageProps) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    try {
      // Simular llamada a API de autenticación
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Aquí iría tu lógica real de autenticación
      // const response = await fetch('/api/auth/professional/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // });

      // Por ahora simulamos un login exitoso
      console.log('Login exitoso:', formData.email);

      // Guardar token o datos de sesión
      localStorage.setItem('userType', 'professional');
      localStorage.setItem('userEmail', formData.email);

      if (onProfessionalLogin) {
        onProfessionalLogin();
      }

      setMessage({ type: 'success', text: '¡Bienvenido de vuelta!' });

      // Redirigir al dashboard de profesionales
      setTimeout(() => {
        if (onNavigate) {
          onNavigate('professional-dashboard');
        }
      }, 500);

    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setMessage({ type: 'error', text: 'Credenciales incorrectas. Intenta nuevamente.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 py-8">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
        {/* Header */}
        <div className="p-6 text-center space-y-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-pink-100 dark:bg-pink-900 rounded-2xl flex items-center justify-center">
              <span className="text-3xl">🌸</span>
            </div>
          </div>

          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              El Jardín de las Respuestas
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Portal Profesional</p>
            <p className="text-xs text-gray-500 dark:text-gray-500">Iniciar sesión como voluntario</p>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Mensaje de éxito/error */}
          {message && (
            <div className={`mb-4 p-3 rounded-lg ${message.type === 'success'
                ? 'bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300 border border-green-200 dark:border-green-800'
                : 'bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-300 border border-red-200 dark:border-red-800'
              }`}>
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Correo Electrónico */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Correo Electrónico
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="tu@email.com"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={isSubmitting}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 dark:bg-gray-700 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>

            {/* Contraseña */}
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Contraseña
              </label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
                disabled={isSubmitting}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 dark:bg-gray-700 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>

            {/* Link para recuperar contraseña */}
            <div className="text-right">
              <button
                type="button"
                onClick={() => alert('Función próximamente disponible')}
                className="text-xs text-pink-600 hover:text-pink-700 dark:text-pink-400 dark:hover:text-pink-300 hover:underline"
                disabled={isSubmitting}
              >
                ¿Olvidaste tu contraseña?
              </button>
            </div>

            {/* Botón de login */}
            <button
              type="submit"
              className="w-full bg-pink-600 hover:bg-pink-700 text-white font-medium py-2 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </button>
          </form>

          {/* Links de navegación */}
          <div className="mt-6 text-center space-y-3">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              ¿Primera vez aquí?{' '}
              <button
                onClick={() => onNavigate && onNavigate('professional-registration')}
                className="text-pink-600 hover:text-pink-700 dark:text-pink-400 dark:hover:text-pink-300 font-medium hover:underline"
                disabled={isSubmitting}
              >
                Regístrate como voluntario
              </button>
            </p>

            <p className="text-sm text-gray-600 dark:text-gray-400">
              ¿Eres estudiante?{' '}
              <button
                onClick={() => onNavigate && onNavigate('auth')}
                className="text-pink-600 hover:text-pink-500 dark:text-pink-400 dark:hover:text-pink-300 font-medium hover:underline"
                disabled={isSubmitting}
              >
                Ingresa aquí
              </button>
            </p>
          </div>

          {/* Modal informativo */}
          <div className="mt-6 p-6 bg-gradient-to-br from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20 rounded-2xl border border-pink-200 dark:border-pink-800">
            <div className="flex items-start gap-3 mb-3">
              <span className="text-2xl">💼</span>
              <h3 className="font-semibold text-lg text-pink-700 dark:text-pink-400">
                Panel de Profesionales
              </h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              Accede a tu panel de control para responder consultas, crear contenido educativo,
              moderar el foro y contribuir a crear un espacio seguro de aprendizaje para adolescentes.
            </p>
          </div>

          {/* Botón para volver */}
          {onNavigate && (
            <button
              type="button"
              onClick={() => onNavigate('home')}
              disabled={isSubmitting}
              className="w-full mt-4 py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Volver al inicio
            </button>
          )}
        </div>
      </div>
    </div>
  );
}