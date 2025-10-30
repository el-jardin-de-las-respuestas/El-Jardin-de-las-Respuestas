import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { toast } from "sonner";
import DatePicker, { registerLocale } from "react-datepicker";
import { cn } from "../ui/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { professionalRegisterSchema } from "../schemas/auth.ts";
import type { TProfessionalRegisterFormData } from "../schemas/auth.ts";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { on } from "events";


export function ProfessionalRegistrationPage() {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        setError,
        watch,
        reset,
    } = useForm({
        resolver: zodResolver(professionalRegisterSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
            birthdate: null,
            registrationNumber: "",
            specialty: "",
        },
    });

    const navigate = useNavigate();

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [birthdate, setBirthdate] = useState<Date | null>(null);
    function sanitizeUserData(data: TProfessionalRegisterFormData) {
        const { registrationNumber, specialty, confirmPassword, ...rest } =
            data;
        return rest;
    }
    const onSubmit = async (data: TProfessionalRegisterFormData) => {
        try {
            const userData = sanitizeUserData(
                data as TProfessionalRegisterFormData
            );
            const professionalData = {
                specialty: data.specialty,
                registrationNumber: data.registrationNumber,
            };
            await axios.post("http://localhost:4000/professional/register", {
                user: userData,
                professional: professionalData,
            });
            toast.success(
                "✅ ¡Se ha registrado correctamente! Ahora puedes iniciar sesión."
            );
            reset();
        } catch (err: any) {
            const backendErrors = err.response?.data?.errors;
            if (backendErrors) {
                Object.entries(backendErrors).forEach(([field, message]) => {
                    setError(field as keyof typeof data, {
                        type: "server",
                        message: message as string,
                    });
                });
            } else {
                const generalField = "username";
                setError(generalField as keyof typeof data, {
                    type: "server",
                    message: err.response?.data?.message || "Error desconocido",
                });
            }
        }
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
                        <CardTitle className="text-2xl">
                            El Jardín de las Respuestas
                        </CardTitle>
                        <p className="text-sm text-muted-foreground mt-2">
                            Únete como Voluntario
                        </p>
                        <p className="text-xs text-muted-foreground">
                            Profesionales que transforman vidas
                        </p>
                    </div>
                </CardHeader>

                <CardContent>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <div className="space-y-2">
                            <Label htmlFor="username">Nombre de usuario</Label>
                            <input
                                id="usuario"
                                placeholder="Ingrese un usuario"
                                {...register("username")}
                                className={cn(
                                    "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border px-3 py-1 text-base bg-input-background transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                                    "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                                    "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
                                )}
                            />
                            {errors.username && (
                                <p className="text-sm text-red-500">
                                    {errors.username.message}
                                </p>
                            )}
                        </div>
                        {/* Correo Electrónico */}
                        <div className="space-y-2">
                            <Label htmlFor="email">Correo Electrónico</Label>
                            <Input
                                id="email"
                                {...register("email")}
                                type="email"
                                placeholder="tu@email.com"
                                required
                                disabled={isSubmitting}
                            />
                            
                        </div>

                        {/* Contraseña */}
                        <div className="space-y-2">
                            <Label htmlFor="password">Contraseña</Label>
                            <Input
                                id="password"
                                {...register("password")}
                                type="password"
                                placeholder="••••••••"
                                required
                                minLength={6}
                                disabled={isSubmitting}
                            />
                        </div>

                        {/* Confirmar Contraseña */}
                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword">
                                Confirmar Contraseña
                            </Label>
                            <Input
                                id="confirmPassword"
                                {...register("confirmPassword")}
                                type="password"
                                placeholder="••••••••"
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
                                {...register("specialty")}
                                type="text"
                                placeholder="Ej: Ginecología, Docente ESI Certificado"
                                required
                                disabled={isSubmitting}
                            />
                        </div>

                        {/* Birthdate*/}

                        <div className="space-y-2">
                            <Label htmlFor="birthdate">
                                Fecha de nacimiento
                            </Label>

                            <Controller
                                control={control}
                                name="birthdate"
                                render={({ field }) => (
                                    <DatePicker
                                        placeholderText="Selecciona tu fecha"
                                        yearDropdownItemNumber={100}
                                        selected={field.value as Date | null}
                                        onChange={(date) =>
                                            field.onChange(date)
                                        }
                                        maxDate={new Date()}
                                        showYearDropdown
                                        scrollableYearDropdown
                                        locale="es"
                                        dateFormat="dd/MM/yyyy"
                                        customInput={
                                            <input
                                                value={
                                                    field.value
                                                        ? (
                                                              field.value as Date
                                                          ).toLocaleDateString(
                                                              "es-ES"
                                                          )
                                                        : ""
                                                }
                                                className={cn(
                                                    "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border px-3 py-1 text-base bg-input-background transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                                                    "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                                                    "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
                                                )}
                                                required
                                            />
                                        }
                                    />
                                )}
                            />

                            {errors.birthdate && (
                                <p className="text-sm text-red-500">
                                    {errors.birthdate.message}
                                </p>
                            )}
                        </div>

                        {/* Matrícula o Certificación */}
                        <div className="space-y-2">
                            <Label htmlFor="certification">
                                Matrícula o Certificación
                            </Label>
                            <Textarea
                                id="certification"
                                {...register("registrationNumber")}
                                placeholder="Número de matrícula o certificación profesional"
                                required
                                disabled={isSubmitting}
                                className="min-h-[80px] resize-none"
                            />
                            <p className="text-xs text-muted-foreground">
                                Verificaremos tus credenciales para garantizar
                                la calidad del contenido
                            </p>
                        </div>

                        {/* Botón de registro */}
                        <Button
                            type="submit"
                            className="w-full bg-pink-600 hover:bg-pink-700"
                            disabled={isSubmitting}
                        >
                            {isSubmitting
                                ? "Registrando..."
                                : "Registrarse como Voluntario"}
                        </Button>
                    </form>

                    {/* Ya tienes cuenta / Eres estudiante */}
                    <div className="mt-6 text-center space-y-3">
                        <p className="text-sm text-muted-foreground">
                            ¿Eres estudiante?{" "}
                            <button
                                onClick={() => navigate("/auth")}
                                className="text-pink-600 hover:text-pink-700 dark:text-pink-400 dark:hover:text-pink-300 font-medium hover:underline"
                                disabled={isSubmitting}
                            >
                                Regístrate como usuario
                            </button>
                        </p>

                        <p className="text-sm text-muted-foreground">
                            ¿Ya tienes cuenta?{" "}
                            <button
                                onClick={() => {

                                        navigate("/professional-login");
                                }}
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
                            Como profesional de la salud o docente ESI
                            certificado, tendrás la oportunidad de crear
                            contenido educativo validado, responder consultas en
                            el chat confidencial, moderar el foro comunitario y
                            contribuir a crear un espacio seguro de aprendizaje
                            para adolescentes. Tu conocimiento puede cambiar
                            vidas.
                        </p>
                    </div>

                    {/* Nota informativa */}
                    <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-900">
                        <p className="text-xs text-muted-foreground">
                            <strong>Nota:</strong> Tu información será
                            verificada por nuestro equipo antes de aprobar tu
                            cuenta como profesional.
                        </p>
                    </div>

                    {/* Botón para volver */}
                        <Button
                            type="button"
                            variant="ghost"
                            className="w-full mt-4"
                            onClick={() => navigate("/home")}
                            disabled={isSubmitting}
                        >
                            Volver al inicio
                        </Button>
                </CardContent>
            </Card>
        </div>
    );
}
