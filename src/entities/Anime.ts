import { v4 } from "uuid";

export class Anime {
  public readonly id: string;
  public id_author: string;
  public id_studio: string;
  public originalTitle: string;
  public alternativeTitle: string;
  public synopsis: string;
  public image: string;
  public episodes: number;
  public seasons: number;
  public rating: number;
  public releaseDate: Date;
  public endDate: Date;

  constructor(props: Omit<Anime, "id">, id?: string) {
    Object.assign(this, props);
    if (!id) {
      this.id = v4();
    }
  }
}
