import { z } from "zod";

export const decodedIdTokenSchema = z.object({
  uid: z.string(),
  email: z.string().optional(),
});
