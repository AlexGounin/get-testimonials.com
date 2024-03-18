import { z } from 'zod';

export const ProductSchema = z.object({
  name: z.string(),
  slug: z
    .string()
    .regex(/^[a-zA-Z0-9_-]*$/)
    .min(5)
    .max(20),
  noteText: z.string().optional().nullable(),
  informationText: z.string().optional().nullable(),
  reviewText: z.string().optional().nullable(),
  thanksText: z.string().optional().nullable(),
  backgroundColors: z.string().optional().nullable(),
});

export type ProductType = z.infer<typeof ProductSchema>;

export const GRADIENTS_CLASSES: string[] = [
  'bg-gradient-to-r from-rose-400 to-red-500',
  'bg-gradient-to-r from-teal-400 to-yellow-200',
  'bg-gradient-to-r from-indigo-400 to-cyan-400',
  'bg-gradient-to-r from-violet-200 to-pink-200',
];
