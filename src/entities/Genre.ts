import { v4 } from "uuid";

export class Genre {
  public readonly id: string;
  public title: string;
  public description: string;

  constructor(props: Omit<Genre, "id">, id?: string) {
    Object.assign(this, props);
    if (!id) {
      this.id = v4();
    }
  }
}
