import { FastifyReply, FastifyRequest } from "fastify";
import { ProductsServiceProtocol } from "../../domain/services/products.service";
import { ProductsRepository } from "../../infrastructure/repositories/products.repository";

export class ProductsController {
  constructor(readonly productsRepository: ProductsRepository) {}

  public async createProduct(request: FastifyRequest, reply: FastifyReply) {
    const body = request.body as ProductsServiceProtocol.CreateParams;
    const response = await this.productsRepository.create(body);
    return reply.status(201).send(response);
  }

  public async getProduct(request: FastifyRequest, reply: FastifyReply) {
    const { slug } = request.params as { slug: string };
    const response = await this.productsRepository.get(slug);
    return reply.status(200).send(response);
  }

  public async updateProduct(request: FastifyRequest, reply: FastifyReply) {
    const { slug } = request.params as { slug: string };
    const body =
      request.body as ProductsServiceProtocol.UpdateParams["product"];
    await this.productsRepository.update({
      slug,
      product: body,
    });
    return reply.status(204).send();
  }

  public async deleteProduct(request: FastifyRequest, reply: FastifyReply) {
    const { slug } = request.params as { slug: string };
    await this.productsRepository.delete(slug);
    return reply.status(204).send();
  }

  public async getProductListByCategory(
    request: FastifyRequest,
    reply: FastifyReply
  ) {
    const { slug } = request.params as { slug: string };
    const query = request.query as ProductsServiceProtocol.ListParams["query"];
    const response = await this.productsRepository.listByCategory({
      slug,
      query,
    });
    return reply.status(200).send(response);
  }
}
