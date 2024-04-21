import * as z from 'zod';

export const selectConfirmationEmailSchema = z.object({
  resource: z.string().email()
});
