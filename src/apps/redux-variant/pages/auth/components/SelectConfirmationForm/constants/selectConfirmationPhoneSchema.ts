import * as z from 'zod';

export const selectConfirmationPhoneSchema = z.object({
  resource: z.string()
});
