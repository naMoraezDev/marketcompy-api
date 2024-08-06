import { FastifyInstance } from "fastify";
import { authRouter } from "./auth/auth.router";
import { healthRouter } from "./health/health.router";
import { productsRouter } from "./products/products.router";
import { categoriestRouter } from "./categories/categories.router";

export async function routes(app: FastifyInstance) {
  app.register(healthRouter);
  app.register(productsRouter);
  app.register(categoriestRouter);
  app.register(authRouter);
}
