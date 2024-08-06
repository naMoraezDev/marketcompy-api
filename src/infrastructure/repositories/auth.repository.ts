import { firebaseAdmin } from "../firebase/admin";
import { AuthServiceProtocol } from "../../domain/services/auth.service";

export class AuthRepository implements AuthServiceProtocol {
  public async verifyIdToken(idToken: string) {
    const decodedIdToken = await firebaseAdmin
      .app()
      .auth()
      .verifyIdToken(idToken);
    return { uid: decodedIdToken.uid, email: decodedIdToken.email };
  }
}
