import { BCryptHashProvider } from "../../../providers/implementations/BCryptHashProvider";
import { UserRepository } from "../../../repositories/implementations/UserRepository";
import { CreateUserController } from "./CreateUserController";
import { CreateUserUseCase } from "./CreateUserUseCase";

const userRepository = new UserRepository();
const hashProvider = new BCryptHashProvider();

const createUserUseCase = new CreateUserUseCase(userRepository, hashProvider);

const createUserController = new CreateUserController(createUserUseCase);

export { createUserController };
