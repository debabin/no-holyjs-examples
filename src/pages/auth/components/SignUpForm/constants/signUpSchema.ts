import * as zod from 'zod';

export const signUpSchema = zod.object({
  email: zod.string().email({ message: 'Invalid email address' }),
  login: zod.string(),
  password: zod.string().min(6, { message: 'Password must be at least 6 characters long' }),
  passwordConfirmation: zod.string(),
  firstName: zod.string().optional(),
  lastName: zod.string().optional()
});
