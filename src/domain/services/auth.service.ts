import { decodedIdTokenSchema } from "../schemas/decoded-id-token.schema";

export interface AuthServiceProtocol {
  verifyIdToken(idToken: string): Promise<typeof decodedIdTokenSchema._type>;
}
