import { z } from "zod";
import { productSchema } from "./product.schema";

export const productListSchema = z.object({
  page: z.number(),
  count: z.number(),
  cached: z.boolean(),
  totalCount: z.number(),
  data: z.array(productSchema),
});
