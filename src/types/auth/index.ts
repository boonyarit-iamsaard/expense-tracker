import { z } from 'zod';

export const loginInputSchema = z.object({
  email: z.string().email('Please enter a valid email.'),
  password: z.string().min(8, 'Password must be at least 8 characters.'),
});

export type LoginInput = z.infer<typeof loginInputSchema>;
