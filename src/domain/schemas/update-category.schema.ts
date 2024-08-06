import { z } from "zod";

export const updateCategorySchema = z.object({
  id: z.string().optional(),
  slug: z.string().optional(),
  name: z.string().optional(),
});
