import { FastifyReply, FastifyRequest } from "fastify";
import { CategoriesServiceProtocol } from "../../domain/services/categories.service";
import { CategoriesRepository } from "../../infrastructure/repositories/categories.repository";

export class CategoriesController {
  constructor(readonly categoriesRepository: CategoriesRepository) {}

  public async createCategory(request: FastifyRequest, reply: FastifyReply) {
    const body = request.body as CategoriesServiceProtocol.CreateParams;
    const response = await this.categoriesRepository.create(body);
    return reply.status(201).send(response);
  }

  public async getCategory(request: FastifyRequest, reply: FastifyReply) {
    const { slug } = request.params as { slug: string };
    const response = await this.categoriesRepository.get(slug);
    return reply.status(200).send(response);
  }

  public async updateCategory(request: FastifyRequest, reply: FastifyReply) {
    const { slug } = request.params as { slug: string };
    const body =
      request.body as CategoriesServiceProtocol.UpdateParams["category"];
    await this.categoriesRepository.update({
      slug,
      category: body,
    });
    return reply.status(204).send();
  }

  public async getCategoryList(_request: FastifyRequest, reply: FastifyReply) {
    const response = await this.categoriesRepository.list();
    return reply.status(200).send(response);
  }

  public async deleteCategory(request: FastifyRequest, reply: FastifyReply) {
    const { slug } = request.params as { slug: string };
    await this.categoriesRepository.delete(slug);
    return reply.status(204).send();
  }
}
