import { IHashProvider } from "../IHashProvider";
import bcrypt from "bcrypt";
import { logger } from "../../logger";

export class BCryptHashProvider implements IHashProvider {
  generate(password: string): string {
    logger.info("generating password hash");
    return bcrypt.hashSync(password, 5);
  }

  compare(password: string, hash: string): boolean {
    logger.info("verifying password");
    return bcrypt.compareSync(password, hash);
  }
}
