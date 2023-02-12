import { User } from "../../entities/User";
import { prisma } from "../../prisma";
import {
  ILoginRetrieveProps,
  IUserLoginProps,
  IUserRepository,
} from "../IUserRepository";

export class UserRepository implements IUserRepository {
  async findUnique(email: string): Promise<User> {
    return await prisma.user.findFirst({
      where: {
        email,
      },
    });
  }

  async create(user: User): Promise<User> {
    return await prisma.user.create({
      data: {
        id: user.id,
        email: user.email,
        password: user.password,
      },
    });
  }

  login({ email, password }: IUserLoginProps): Promise<ILoginRetrieveProps> {
    throw new Error("Method not implemented.");
  }
}
