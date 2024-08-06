import { z } from "zod";
import { categorySchema } from "./category.schema";

export const categoryResponseSchema = z.object({
  cached: z.boolean(),
  data: categorySchema,
});
