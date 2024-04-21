import * as z from 'zod';

export const confirmationSchema = z.object({
  otp: z.string().min(6)
});
