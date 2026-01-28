import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const registerSchema = z.object({
  username: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
});

export const userSchema = z.object({
  id: z.number(),
  username: z.string().nullable(),
  email: z.string(),
  provider: z.string(),
});