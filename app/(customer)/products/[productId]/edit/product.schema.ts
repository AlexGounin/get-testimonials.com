import { z } from 'zod';

export const ProductSchema = z.object({
  name: z.string(),
  noteText: z.string().optional(),
  informationText: z.string().optional(),
  reviewText: z.string().optional(),
  thanksText: z.string().optional(),
  backgroundColors: z.string(),
});

export type ProductType = z.infer<typeof ProductSchema>;

export const GRADIENTS_CLASSES: string[] = [
  'bg-gradient-to-r from-rose-400 to-red-500',
  'bg-gradient-to-r from-teal-400 to-yellow-200',
  'bg-gradient-to-r from-indigo-400 to-cyan-400',
  'bg-gradient-to-r from-violet-200 to-pink-200',
];
