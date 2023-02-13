import { IHashProvider } from "../../../providers/IHashProvider";
import { ITokenProvider } from "../../../providers/ITokenProvider";
import {
  ILoginRetrieveProps,
  IUserRepository,
} from "../../../repositories/IUserRepository";
import { IAuthRequestDTO } from "./AuthDTO";

export class AuthUseCase {
  private userRepository: IUserRepository;
  private hashProvider: IHashProvider;
  private tokenProvider: ITokenProvider;

  constructor(
    userRepository: IUserRepository,
    hashProvider: IHashProvider,
    tokenProvider: ITokenProvider
  ) {
    this.userRepository = userRepository;
    this.hashProvider = hashProvider;
    this.tokenProvider = tokenProvider;
  }

  async execute(data: IAuthRequestDTO): Promise<ILoginRetrieveProps> {
    const existingUser = await this.userRepository.findUnique(data.email);

    if (!existingUser) {
      throw new Error("User or password invalid");
    }
    if (!this.hashProvider.compare(data.password, existingUser.password)) {
      throw new Error("User or password invalid");
    }
    return { token: this.tokenProvider.generateAccessToken(existingUser) };
  }
}
