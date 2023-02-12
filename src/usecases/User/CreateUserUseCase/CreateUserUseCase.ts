import { User } from "../../../entities/User";
import { IHashProvider } from "../../../providers/IHashProvider";
import { IUserRepository } from "../../../repositories/IUserRepository";
import { ICreateUserRequestDTO } from "./CreateUserDTO";

export class CreateUserUseCase {
  private userRepository: IUserRepository;
  private hashProvider: IHashProvider;

  constructor(userRepository: IUserRepository, hashProvider: IHashProvider) {
    this.userRepository = userRepository;
    this.hashProvider = hashProvider;
  }

  async execute(data: ICreateUserRequestDTO): Promise<User> {
    const existingUser = await this.userRepository.findUnique(data.email);

    if (existingUser) {
      throw new Error("User already exists");
    }
    const hashedPassword = this.hashProvider.generate(data.password);

    const user = new User({ ...data, password: hashedPassword });

    return await this.userRepository.create(user);
  }
}
