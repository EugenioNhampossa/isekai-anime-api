import { User } from "../entities/User";

export interface IUserLoginProps {
  email: string;
  password: string;
}

export interface ILoginRetrieveProps {
  token: string;
}

export interface IUserRepository {
  login({ email, password }: IUserLoginProps): Promise<ILoginRetrieveProps>;
  create(user: User): Promise<User>;
  findUnique(email: string): Promise<User>;
}
