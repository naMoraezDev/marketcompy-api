import { FastifyReply, FastifyRequest } from "fastify";
import { AuthRepository } from "../../infrastructure/repositories/auth.repository";

export class AuthController {
  constructor(readonly authRepository: AuthRepository) {}

  public async verifyIdToken(request: FastifyRequest, reply: FastifyReply) {
    const { idToken } = request.body as { idToken: string };
    try {
      const response = await this.authRepository.verifyIdToken(idToken);
      return reply.status(200).send(response);
    } catch {
      throw new Error("Error verifying ID token.");
    }
  }
}
