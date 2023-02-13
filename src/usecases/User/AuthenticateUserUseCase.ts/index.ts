import { BCryptHashProvider } from "../../../providers/implementations/BCryptHashProvider";
import { JwtWebTokenProvider } from "../../../providers/implementations/JWTtokenProvider";
import { UserRepository } from "../../../repositories/implementations/UserRepository";
import { AuthController } from "./AuthController";
import { AuthUseCase } from "./AuthUseCase";

const userRepository = new UserRepository();
const hashProvider = new BCryptHashProvider();
const tokenProvider = new JwtWebTokenProvider();

const authUseCase = new AuthUseCase(
  userRepository,
  hashProvider,
  tokenProvider
);

const authController = new AuthController(authUseCase);

export { authController };
