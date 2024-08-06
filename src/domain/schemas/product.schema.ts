import { z } from "zod";

export const productSchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string(),
  price: z.number(),
  category: z.string(),
  currency: z.string(),
  available: z.boolean(),
  description: z.string(),
  specifications: z.object({
    weight: z.string(),
    dimensions: z.string(),
  }),
  reviews: z.array(
    z.object({
      id: z.string(),
      text: z.string(),
      rating: z.number(),
      author: z.string(),
      timestamp: z.string(),
    })
  ),
  images: z.array(z.string()),
});
