import * as z from 'zod';

export const signUpSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters long' }),
  passwordConfirmation: z.string(),
  firstName: z.string(),
  lastName: z.string()
});
