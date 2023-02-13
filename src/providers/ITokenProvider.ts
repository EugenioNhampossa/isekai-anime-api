import { User } from "../entities/User";

export interface ITokenProvider {
  generateAccessToken(user: User): string;
  generateRefreshToken(user: User): string;
  verifyAccessToken(token: string): boolean;
  verifyRefreshToken(token: string): boolean;
  addToken(token: string): void;
  removeToken(token: string): void;
  getRefreshTokens(): string[];
}
