import { z } from "zod";
import { FastifyInstance } from "fastify";

export async function healthRouter(app: FastifyInstance) {
  app.get(
    "/healthz",
    {
      schema: {
        tags: ["health"],
        summary: "Check the app's health.",
        response: {
          200: z.object({
            uptime: z.number(),
            message: z.string(),
            timestamp: z.number(),
          }),
        },
      },
    },
    async (_request, reply) => {
      await reply.status(200).send({
        message: "OK",
        timestamp: Date.now(),
        uptime: process.uptime(),
      });
    }
  );
}
