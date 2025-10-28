import { z } from "zod";

// --- Schema base compartido ---
const baseRegisterSchema = z.object({
  email: z
    .email({ message: "Formato de email inválido." })
    .trim(),
  username: z
    .string()
    .min(3, { message: "El usuario debe tener al menos 3 caracteres" })
    .max(20, { message: "El usuario no puede exceder 20 caracteres" })
    .regex(/^\S*$/, { message: "El usuario no puede contener espacios" }),
  password: z.string().min(6, { message: "La contraseña debe tener 6 caracteres" }),
  confirmPassword: z.string(),
  birthdate: z
    .date()
    .max(new Date())
    .nullable()
    .refine((date) => date !== null, {
      message: "La fecha de nacimiento es obligatoria.",
    }),
});


const ageValidator = (minAge: number) => (date: Date | null) => {
  if (!date) return false;
  const today = new Date();
  const birth = new Date(date);
  let age = today.getFullYear() - birth.getFullYear();
  if (today.getMonth() < birth.getMonth() ||
      (today.getMonth() === birth.getMonth() && today.getDate() < birth.getDate())) {
    age--;
  }
  return age >= minAge;
};


export const registerSchema = baseRegisterSchema
  .extend({
    birthdate: baseRegisterSchema.shape.birthdate.refine(
      ageValidator(12),
      { message: "Debes ser mayor de 12 años para registrarte." }
    ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden.",
    path: ["confirmPassword"],
  });

export type TRegisterFormData = z.infer<typeof registerSchema>;


export const professionalRegisterSchema = baseRegisterSchema
  .extend({
    birthdate: baseRegisterSchema.shape.birthdate.refine(
      ageValidator(18),
      { message: "Debes ser mayor de 18 años para registrarte." }
    ),
    specialty: z.string().min(3).max(100),
    registrationNumber: z.string().min(3).max(20)
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden.",
    path: ["confirmPassword"],
  })

export type TProfessionalRegisterFormData = z.infer<typeof professionalRegisterSchema>;

export const loginSchema = baseRegisterSchema.pick({
  email: true,
  password: true,
});

export type TLoginFormData = z.infer<typeof loginSchema>;

export type TAuthFormData = TRegisterFormData | TProfessionalRegisterFormData | TLoginFormData;