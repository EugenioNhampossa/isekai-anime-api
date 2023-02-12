export interface IHashProvider {
  generate(password: string): string;
  compare(password: string, hash: string): boolean;
}
