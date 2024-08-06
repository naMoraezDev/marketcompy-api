import { z } from "zod";
import { FastifyInstance } from "fastify";
import { productSchema } from "../../domain/schemas/product.schema";
import { productListSchema } from "../../domain/schemas/product-list.schema";
import { updateProductSchema } from "../../domain/schemas/update-product.schema";
import { productResponseSchema } from "../../domain/schemas/product-response.schema";
import { ProductsController } from "../../application/controllers/products.controller";
import { ProductsRepository } from "../../infrastructure/repositories/products.repository";
import { authorizationMiddleware } from "../../application/middlewares/authorization.midleware";

export async function productsRouter(app: FastifyInstance) {
  app.addHook("onRequest", authorizationMiddleware);

  app.post(
    "/products",
    {
      schema: {
        tags: ["products"],
        summary: "Create a new product.",
        body: productSchema.omit({ id: true, slug: true }),
        headers: z.object({
          "x-api-key": z.string().optional(),
        }),
        response: {
          201: z.string(),
        },
      },
    },
    async (request, reply) => {
      await new ProductsController(new ProductsRepository()).createProduct(
        request,
        reply
      );
    }
  );

  app.delete(
    "/products/:slug",
    {
      schema: {
        tags: ["products"],
        summary: "Delete a product.",
        headers: z.object({
          "x-api-key": z.string().optional(),
        }),
        params: z.object({
          slug: z.string(),
        }),
        response: {
          204: z.any({ description: "No Content" }).default(null),
        },
      },
    },
    async (request, reply) => {
      await new ProductsController(new ProductsRepository()).deleteProduct(
        request,
        reply
      );
    }
  );

  app.get(
    "/products/category/:slug",
    {
      schema: {
        tags: ["products"],
        summary: "Get the list of products by category slug.",
        headers: z.object({
          "x-api-key": z.string().optional(),
        }),
        params: z.object({
          slug: z.string(),
        }),
        query: z.object({
          limit: z.string().optional(),
          page: z.string().optional(),
        }),
        response: {
          200: productListSchema,
        },
      },
    },
    async (request, reply) => {
      await new ProductsController(
        new ProductsRepository()
      ).getProductListByCategory(request, reply);
    }
  );

  app.get(
    "/products/:slug",
    {
      schema: {
        tags: ["products"],
        summary: "Get a product.",
        headers: z.object({
          "x-api-key": z.string().optional(),
        }),
        params: z.object({
          slug: z.string(),
        }),
        response: {
          200: productResponseSchema,
        },
      },
    },
    async (request, reply) => {
      await new ProductsController(new ProductsRepository()).getProduct(
        request,
        reply
      );
    }
  );

  app.put(
    "/products/:slug",
    {
      schema: {
        tags: ["products"],
        summary: "Update a product.",
        headers: z.object({
          "x-api-key": z.string().optional(),
        }),
        params: z.object({
          slug: z.string(),
        }),
        body: updateProductSchema.omit({ id: true }),
        response: {
          204: z.any({ description: "No Content" }).default(null),
        },
      },
    },
    async (request, reply) => {
      await new ProductsController(new ProductsRepository()).updateProduct(
        request,
        reply
      );
    }
  );
}
