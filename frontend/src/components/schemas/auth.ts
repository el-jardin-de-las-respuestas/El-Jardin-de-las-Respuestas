import { z } from "zod";

const registerSchema = z.object({
    email: z
        .email({ message: "Formato de email inválido." })
        .trim(),

    username: z
        .string()
        .min(3, { message: "El usuario debe tener al menos 3 caracteres" })
        .max(20, { message: "El usuario no puede exceder 20 caracteres" })
        .regex(/^\S*$/, { message: "El usuario no puede contener espacios" }),

    password: z
        .string()
        .min(6, { message: "La contraseña debe tener 6 caracteres" }),

    confirmPassword: z.string(),

    birthdate: z
        .date({ message: "La fecha de nacimiento es obligatoria." })
        .max(new Date())
        .nullable()
        .refine((date) => date !== null, {
            message: "La fecha de nacimiento es obligatoria.",
        }),
});

export const fullRegisterSchema = registerSchema
    .extend({
        birthdate: registerSchema.shape.birthdate.refine(
            (data) => {
                if (!data) return false;
                const today = new Date();
                const birth = new Date(data);
                let age = today.getFullYear() - birth.getFullYear();

                if (
                    today.getMonth() < birth.getMonth() ||
                    (today.getMonth() === birth.getMonth() &&
                        today.getDate() < birth.getDate())
                ) {
                    age--;
                }
                return age >= 12;
            },
            {
                message: "Debes ser mayor de 12 años para registrarte.",
            }
        ),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Las contraseñas no coinciden.",
        path: ["confirmPassword"],
    });

export type TRegisterFormData = z.infer<typeof fullRegisterSchema>;
export const loginSchema = fullRegisterSchema.pick({
    email: true,
    password: true,
});

// 2. Tipo para Login (para RHF)
export type TLoginFormData = z.infer<typeof loginSchema>;

// El tipo de los formularios será la unión de ambos tipos
export type TAuthFormData = TRegisterFormData | TLoginFormData;