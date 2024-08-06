import { z } from "zod";
import { FastifyInstance } from "fastify";
import { categorySchema } from "../../domain/schemas/category.schema";
import { categoryListSchema } from "../../domain/schemas/category-list.schema";
import { updateCategorySchema } from "../../domain/schemas/update-category.schema";
import { categoryResponseSchema } from "../../domain/schemas/category-response.schema";
import { CategoriesController } from "../../application/controllers/categories.controller";
import { CategoriesRepository } from "../../infrastructure/repositories/categories.repository";

export async function categoriestRouter(app: FastifyInstance) {
  app.post(
    "/categories",
    {
      schema: {
        tags: ["categories"],
        summary: "Create a new category.",
        body: categorySchema.omit({ id: true, slug: true }),
        headers: z.object({
          "x-api-key": z.string().optional(),
        }),
        response: {
          201: z.string(),
        },
      },
    },
    async (request, reply) => {
      await new CategoriesController(new CategoriesRepository()).createCategory(
        request,
        reply
      );
    }
  );

  app.get(
    "/categories/:slug",
    {
      schema: {
        tags: ["categories"],
        summary: "Get a category.",
        headers: z.object({
          "x-api-key": z.string().optional(),
        }),
        response: {
          200: categoryResponseSchema,
        },
      },
    },
    async (request, reply) => {
      await new CategoriesController(new CategoriesRepository()).getCategory(
        request,
        reply
      );
    }
  );

  app.put(
    "/categories/:slug",
    {
      schema: {
        tags: ["categories"],
        summary: "Update a category.",
        headers: z.object({
          "x-api-key": z.string().optional(),
        }),
        params: z.object({
          slug: z.string(),
        }),
        body: updateCategorySchema.omit({ id: true }),
        response: {
          204: z.any({ description: "No Content" }).default(null),
        },
      },
    },
    async (request, reply) => {
      await new CategoriesController(new CategoriesRepository()).updateCategory(
        request,
        reply
      );
    }
  );

  app.get(
    "/categories",
    {
      schema: {
        tags: ["categories"],
        summary: "Get the list of categories.",
        headers: z.object({
          "x-api-key": z.string().optional(),
        }),
        response: {
          200: categoryListSchema,
        },
      },
    },
    async (request, reply) => {
      await new CategoriesController(
        new CategoriesRepository()
      ).getCategoryList(request, reply);
    }
  );

  app.delete(
    "/categories/:slug",
    {
      schema: {
        tags: ["categories"],
        summary: "Delete a category.",
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
      await new CategoriesController(new CategoriesRepository()).deleteCategory(
        request,
        reply
      );
    }
  );
}
