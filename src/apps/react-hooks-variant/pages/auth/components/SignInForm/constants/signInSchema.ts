import * as z from 'zod';

export const signInEmailSchema = z.object({
  login: z.string().email()
});

export const signInLoginSchema = z.object({
  login: z.string(),
  password: z.string()
});
