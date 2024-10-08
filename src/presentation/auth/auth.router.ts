import { z } from "zod";
import { FastifyInstance } from "fastify";
import { AuthController } from "../../application/controllers/auth.controller";
import { AuthRepository } from "../../infrastructure/repositories/auth.repository";
import { decodedIdTokenSchema } from "../../domain/schemas/decoded-id-token.schema";
import { authorizationMiddleware } from "../../application/middlewares/authorization.midleware";

export async function authRouter(app: FastifyInstance) {
  app.addHook("onRequest", authorizationMiddleware);

  app.post(
    "/auth/verify-id-token",
    {
      schema: {
        tags: ["auth"],
        summary: "Verify a ID token.",
        body: z.object({
          idToken: z.string(),
        }),
        headers: z.object({
          "x-api-key": z.string().optional(),
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
