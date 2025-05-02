import { z } from 'zod';

export const carSchema = z.object({
  name: z.string().min(1, 'Pflichtfeld'),
  price: z.number().min(0),
  image: z.string().url(),
  description: z.string().min(1),
});

export type CarFormData = z.infer<typeof carSchema>;
