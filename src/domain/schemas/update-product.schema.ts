import { z } from "zod";

export const updateProductSchema = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  price: z.number().optional(),
  category: z.string().optional(),
  currency: z.string().optional(),
  description: z.string().optional(),
  specifications: z
    .object({
      weight: z.string().optional(),
      dimensions: z.string().optional(),
    })
    .optional(),
  reviews: z
    .array(
      z.object({
        id: z.string().optional(),
        text: z.string().optional(),
        rating: z.number().optional(),
        author: z.string().optional(),
        timestamp: z.string().optional(),
      })
    )
    .optional(),
  images: z.array(z.string()).optional(),
});
