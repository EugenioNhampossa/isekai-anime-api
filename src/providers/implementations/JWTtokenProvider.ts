import { User } from "../../entities/User";
import { ITokenProvider } from "../ITokenProvider";
import jwt from "jsonwebtoken";
import { logger } from "../../logger";

let refreshTokens = [];

export class JwtWebTokenProvider implements ITokenProvider {
  addToken(token: string): void {
    refreshTokens.push(token);
  }

  removeToken(token: string): void {
    refreshTokens = refreshTokens.filter((token) => token !== token);
  }

  getRefreshTokens(): string[] {
    return refreshTokens;
  }

  verifyAccessToken(token: string): boolean {
    let res = true;
    jwt.verify(token, "secretKey", (err) => {
      if (err) {
        res = false;
      }
    });
    return res;
  }

  verifyRefreshToken(token: string): boolean {
    let res = true;
    jwt.verify(token, "refreshSecretKey", (err) => {
      if (err) {
        res = false;
      }
    });
    return res;
  }

  generateAccessToken(user: User): string {
    logger.info("Generating token");
    return jwt.sign(
      {
        id: user.id,
      },
      "secretKey",
      {
        expiresIn: "15m",
      }
    );
  }

  generateRefreshToken(user: User): string {
    return jwt.sign(
      {
        id: user.id,
      },
      "refreshSecretKey"
    );
  }
}
