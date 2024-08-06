import { FastifyRequest } from "fastify";

export async function authorizationMiddleware(request: FastifyRequest) {
  const apiKey = request.headers["x-api-key"] as string;
  if (!apiKey) {
    throw new Error("Missing API key.");
  }
  if (apiKey !== process.env.API_KEY) {
    throw new Error("Invalid API key.");
  }
}
