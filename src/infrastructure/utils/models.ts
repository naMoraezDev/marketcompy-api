import { FastifyInstance } from "fastify";

export async function models(app: FastifyInstance) {
  app.addSchema({
    $id: "product",
    type: "object",
    properties: {
      id: { type: "string" },
      slug: { type: "string" },
      name: { type: "string" },
      price: { type: "number" },
      category: { type: "string" },
      currency: { type: "string" },
      available: { type: "boolean" },
      description: { type: "string" },
      specifications: {
        type: "array",
      },
      reviews: {
        type: "array",
      },
      images: {
        type: "array",
      },
    },
  });

  app.addSchema({
    $id: "category",
    type: "object",
    properties: {
      id: { type: "string" },
      slug: { type: "string" },
      name: { type: "string" },
    },
  });

  app.addSchema({
    $id: "health",
    type: "object",
    properties: {
      uptime: { type: "number" },
      message: { type: "string" },
      timestamp: { type: "number" },
    },
  });

  app.addSchema({
    $id: "decodedIdToken",
    type: "object",
    properties: {
      uid: { type: "string" },
      email: { type: "string" },
    },
  });
}
