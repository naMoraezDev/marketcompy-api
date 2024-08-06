import { z } from "zod";
import { FastifyInstance } from "fastify";
import { AuthController } from "../../application/controllers/auth.controller";
import { AuthRepository } from "../../infrastructure/repositories/auth.repository";
import { decodedIdTokenSchema } from "../../domain/schemas/decoded-id-token.schema";

export async function authRouter(app: FastifyInstance) {
  app.post(
    "/auth/verify-id-token",
    {
      schema: {
        tags: ["auth"],
        summary: "Verify a ID token.",
        body: z.object({
          idToken: z.string(),
        }),
        response: {
          200: decodedIdTokenSchema,
        },
      },
    },
    async (request, reply) => {
      await new AuthController(new AuthRepository()).verifyIdToken(
        request,
        reply
      );
    }
  );
}
