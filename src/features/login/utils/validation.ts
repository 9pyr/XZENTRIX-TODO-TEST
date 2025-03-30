import { z } from "zod"

export const validateEmail = z
  .string({ required_error: "Email is required" })
  .email()

export const validatePassword = z
  .string({ required_error: "Password is required" })
  .min(8, { message: "Password is too short" })
  .max(20, { message: "Password is too long" })
