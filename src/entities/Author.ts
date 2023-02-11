import { v4 } from "uuid";

export class Author {
  public readonly id: string;
  public name: string;

  constructor(props: Omit<Author, "id">, id?: string) {
    Object.assign(this, props);
    if (!id) {
      this.id = v4();
    }
  }
}
