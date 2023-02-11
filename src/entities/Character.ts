import { v4 } from "uuid";

export class Character {
  public readonly id: string;
  public id_anime: string;
  public name: string;
  public main: boolean;
  public description: string;
  public image: string;

  constructor(props: Omit<Character, "id">, id?: string) {
    Object.assign(this, props);
    if (!id) {
      this.id = v4();
    }
  }
}
