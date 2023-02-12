import { IHashProvider } from "../IHashProvider";
import bcrypt from "bcrypt";

export class BCryptHashProvider implements IHashProvider {
  generate(password: string): string {
    return bcrypt.hashSync(password, 5);
  }

  compare(password: string, hash: string): boolean {
    return bcrypt.compareSync(password, hash);
  }
}
