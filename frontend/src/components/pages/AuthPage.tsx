import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Card } from "../ui/card";
import { Flower2, Eye, EyeOff } from "lucide-react";

interface AuthPageProps {
  onLogin: () => void;
}

export function AuthPage({ onLogin }: AuthPageProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    age: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login - en producción esto conectaría con Supabase
    onLogin();
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6 py-12">
      <Card className="w-full max-w-md rounded-[3rem] border-2 border-secondary/40 p-8 shadow-[0_16px_50px_var(--color-shadow-soft)] md:p-10">
        {/* Logo */}
        <div className="mb-8 flex flex-col items-center">
          <div className="mb-4 flex size-20 items-center justify-center rounded-[2rem] bg-secondary/30">
            <Flower2 className="size-10 text-primary" />
          </div>
          <h2 className="text-center">
            {isLogin ? "Bienvenidx de Vuelta" : "Únete al Jardín"}
          </h2>
          <p className="mt-2 text-center text-muted-foreground">
            {isLogin
              ? "Ingresa a tu espacio seguro"
              : "Crea tu cuenta y comienza a aprender"}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">Correo Electrónico</Label>
            <Input
              id="email"
              type="email"
              placeholder="tu@email.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="rounded-[2rem] border-2 border-secondary/40 bg-input-background px-6 py-6 focus:border-primary focus:shadow-[0_0_0_3px_var(--color-shadow-soft)]"
              required
            />
          </div>

          {/* Age (only for registration) */}
          {!isLogin && (
            <div className="space-y-2">
              <Label htmlFor="age">Edad</Label>
              <Input
                id="age"
                type="number"
                placeholder="Tu edad"
                min="12"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                className="rounded-[2rem] border-2 border-secondary/40 bg-input-background px-6 py-6 focus:border-primary focus:shadow-[0_0_0_3px_var(--color-shadow-soft)]"
                required
              />
              <p className="text-sm text-muted-foreground">
                Esta plataforma está diseñada para personas de 12 años en adelante
              </p>
            </div>
          )}

          {/* Password */}
          <div className="space-y-2">
            <Label htmlFor="password">Contraseña</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="rounded-[2rem] border-2 border-secondary/40 bg-input-background px-6 py-6 pr-14 focus:border-primary focus:shadow-[0_0_0_3px_var(--color-shadow-soft)]"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
              </button>
            </div>
          </div>

          {/* Confirm Password (only for registration) */}
          {!isLogin && (
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
              <Input
                id="confirmPassword"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
                className="rounded-[2rem] border-2 border-secondary/40 bg-input-background px-6 py-6 focus:border-primary focus:shadow-[0_0_0_3px_var(--color-shadow-soft)]"
                required
              />
            </div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full rounded-[2rem] py-6 shadow-[0_8px_30px_var(--color-shadow-soft)]"
            id="auth-submit"
          >
            {isLogin ? "Ingresar" : "Crear Cuenta"}
          </Button>

          {/* Toggle Auth Mode */}
          <div className="text-center">
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-muted-foreground hover:text-primary"
            >
              {isLogin ? (
                <>
                  ¿No tienes cuenta?{" "}
                  <span className="text-primary">Regístrate aquí</span>
                </>
              ) : (
                <>
                  ¿Ya tienes cuenta? <span className="text-primary">Ingresa aquí</span>
                </>
              )}
            </button>
          </div>
        </form>

        {/* Privacy Note */}
        <div className="mt-8 rounded-[2rem] bg-secondary/20 p-4 text-center">
          <p className="text-sm text-muted-foreground">
            🔒 Tu privacidad es nuestra prioridad. Tus datos están seguros y protegidos.
          </p>
        </div>
      </Card>
    </div>
  );
}
