import { v4 } from "uuid";

export class Studio {
  public readonly id: string;
  public name: string;

  constructor(props: Omit<Studio, "id">, id?: string) {
    Object.assign(this, props);
    if (!id) {
      this.id = v4();
    }
  }
}
