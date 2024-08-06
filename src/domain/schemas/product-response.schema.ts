import { z } from "zod";
import { productSchema } from "./product.schema";

export const productResponseSchema = z.object({
  cached: z.boolean(),
  data: productSchema,
});
