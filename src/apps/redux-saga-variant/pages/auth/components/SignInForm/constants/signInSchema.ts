import * as z from 'zod';

export const signInEmailSchema = z.object({
  login: z.string().email({ message: 'Invalid email address' })
});

export const signInLoginSchema = z.object({
  login: z.string().optional(),
  password: z.string()
});
