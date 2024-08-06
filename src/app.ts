import path from "path";
import fastify from "fastify";
import {
  validatorCompiler,
  serializerCompiler,
  jsonSchemaTransform,
} from "fastify-type-provider-zod";
import fastifyCors from "@fastify/cors";
import packageJSON from "../package.json";
import fastifySwagger from "@fastify/swagger";
import { routes } from "./presentation/routes";
import { fastifyExpress } from "@fastify/express";
import fastifySwaggerUI from "@fastify/swagger-ui";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { models } from "./infrastructure/utils/models";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.register(fastifyCors, {
  origin: "*",
});

app.register(require("@fastify/static"), {
  root: path.join(__dirname, "../public"),
  prefix: "/public/",
});

app.register(fastifySwagger, {
  swagger: {
    schemes: ["http", "https"],
    consumes: ["application/json"],
    produces: ["application/json"],
    info: {
      title: "market-compy API",
      version: packageJSON.version,
    },
  },
  transform: jsonSchemaTransform,
});

app.register(fastifySwaggerUI, {
  routePrefix: "/swagger",
  theme: {
    title: "Marketcompy API",
    css: [
      {
        filename: "theme.css",
        content:
          'body { padding-bottom: 80px } .topbar { position: sticky } .topbar { top: 0 } .topbar { z-index: 1 } .topbar { width: 100% } .link img { display: none } .link:after { content: "labcompy" }',
      },
    ],
  },
});

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(fastifyExpress);

app.register(models);

app.register(routes, { prefix: "/api/v1" });

export default app;
