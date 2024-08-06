import { z } from "zod";
import { categorySchema } from "./category.schema";

export const categoryListSchema = z.object({
  cached: z.boolean(),
  data: z.array(categorySchema),
});
