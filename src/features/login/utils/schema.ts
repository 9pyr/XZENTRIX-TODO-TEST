import { LoginFormData, RegisterFormData } from "@/features/login/types"
import {
  validateEmail,
  validatePassword,
} from "@/features/login/utils/validation"
import { z, ZodType } from "zod"

export const LoginSchema: ZodType<LoginFormData> = z.object({
  email: validateEmail,
  password: validatePassword,
})

export const RegisterSchema: ZodType<RegisterFormData> = z
  .object({
    email: validateEmail,
    password: validatePassword,
    confirmPassword: z.string({
      required_error: "Confirm Password is required",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })
