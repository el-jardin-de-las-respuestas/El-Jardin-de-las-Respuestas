import { useState } from "react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Card } from "../ui/card";
import { Flower2, Eye, EyeOff } from "lucide-react";
import DatePicker, { registerLocale } from "react-datepicker";
import { es } from "date-fns/locale";
import "react-datepicker/dist/react-datepicker.css";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, loginSchema } from "../schemas/auth.ts";
import type { TRegisterFormData, TLoginFormData } from "../schemas/auth";
import { inputClassName } from "../../styles/inputStyle";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from 'sonner'; 

registerLocale("es", es);
interface AuthPageProps {
    onLogin: () => void;
}

export function AuthPage({onLogin} : AuthPageProps) {
    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const schema = isLogin ? loginSchema : registerSchema;
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        setError,
        watch,
        reset,
    } = useForm({
        resolver: zodResolver(schema),
        defaultValues: isLogin
            ? { email: "", password: "" }
            : {
                  username: "",
                  email: "",
                  password: "",
                  confirmPassword: "",
                  birthdate: null,
              },
    });
    const navigate = useNavigate();
    function sanitizeUserData(data: TRegisterFormData) {
        const { confirmPassword, ...rest } = data;
        return rest;
    }
    const auth = useContext(AuthContext);
    if (!auth) throw new Error("AuthContext no está disponible");

    const onSubmit = async (data: TLoginFormData | TRegisterFormData) => {
        try {
            if (isLogin) {
                const res = await axios.post(
                    "http://localhost:4000/auth/login",
                    data
                );
                auth.login(res.data.access_token);
                onLogin();
                toast.success("✅ Inicio de sesión exitoso");
            } else {
                await axios.post(
                    "http://localhost:4000/users/register",
                    sanitizeUserData(data as TRegisterFormData) 
                );
                toast.success("✅ ¡Se ha registrado correctamente! Ahora puedes iniciar sesión.");
                setIsLogin(true);
                reset({ email: "", password: "" });
            }
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
                const generalField = isLogin ? "email" : "username";
                setError(generalField as keyof typeof data, {
                    type: "server",
                    message: err.response?.data?.message || "Error desconocido",
                });
            }
        }
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
                        {isLogin
                            ? "¡Qué bueno verte de nuevo!"
                            : "Únete al Jardín"}
                    </h2>
                    <p className="mt-2 text-center text-muted-foreground">
                        {isLogin
                            ? "Inicia sesión para continuar."
                            : "Crea tu cuenta y comienza a aprender"}
                    </p>
                </div>
                {/* Username */}
                {!isLogin && (
                    <div className="space-y-2">
                        <Label htmlFor="username">Nombre de usuario</Label>
                        <input
                            id="usuario"
                            placeholder="Ingrese un usuario"
                            {...register("username")}
                            className={inputClassName}
                        />
                        {errors.username && (
                            <p className="text-sm text-red-500">
                                {errors.username.message}
                            </p>
                        )}
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Email */}
                    <div className="space-y-2">
                        <Label htmlFor="email">Correo electrónico</Label>
                        <input
                            id="email"
                            type="email"
                            placeholder="tu@email.com"
                            {...register("email")}
                            className={inputClassName}
                            required
                        />

                        {errors.email && (
                            <p className="text-sm text-red-500">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    {/* Birthdate*/}
                    {!isLogin && (
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
                                                className={inputClassName}
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

                            <p className="text-sm text-muted-foreground">
                                Esta plataforma está diseñada para personas de
                                12 años en adelante
                            </p>
                        </div>
                    )}

                    {/* Password */}
                    <div className="space-y-2">
                        <Label htmlFor="password">Contraseña</Label>
                        <div className="relative">
                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
                                {...register("password")}
                                className={inputClassName}
                                required
                            />
                            {errors.password && (
                                <p className="text-sm text-red-500">
                                    {errors.password.message}
                                </p>
                            )}
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                            >
                                {showPassword ? (
                                    <EyeOff className="size-5" />
                                ) : (
                                    <Eye className="size-5" />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Confirm Password*/}
                    {!isLogin && (
                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword">
                                Confirmar Contraseña
                            </Label>
                            <input
                                id="confirmPassword"
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
                                {...register("confirmPassword")}
                                className={inputClassName}
                            />
                            {errors.confirmPassword && (
                                <p className="text-sm text-red-500">
                                    {errors.confirmPassword.message}
                                </p>
                            )}
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
                            onClick={() => {
                                setIsLogin(!isLogin);
                                reset();
                            }}
                            className="text-muted-foreground hover:text-primary"
                        >
                            {isLogin ? (
                                <>
                                    ¿No tienes cuenta?{" "}
                                    <span className="text-primary">
                                        Regístrate aquí
                                    </span>
                                </>
                            ) : (
                                <>
                                    ¿Ya tienes cuenta?{" "}
                                    <span className="text-primary">
                                        Ingresa aquí
                                    </span>
                                </>
                            )}
                        </button>
                    </div>
                </form>

                {/* Privacy Note */}
                <div className="mt-8 rounded-[2rem] bg-secondary/20 p-4 text-center">
                    <p className="text-sm text-muted-foreground">
                        🔒 Tu privacidad es nuestra prioridad. Tus datos están
                        seguros y protegidos.
                    </p>
                </div>
            </Card>
        </div>
    );
}
