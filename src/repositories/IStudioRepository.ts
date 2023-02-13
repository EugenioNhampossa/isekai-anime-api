import { Studio } from "@prisma/client";
import { IMetaProps } from "../@types/IMetaProps";
import { IStudioFilter } from "../@types/IStudioFilter";

export interface IStudioData {
  data: Studio[];
  meta: IMetaProps;
}

export interface IStudioRepository {
  create(studio: Studio): Promise<Studio>;
  update(studio: Studio): Promise<void>;
  delete(id: Studio): Promise<void>;
  findAll(filter: IStudioFilter): Promise<IStudioData>;
  findUnique(id: string): Promise<Studio>;
  findByName(name: string): Promise<Studio>;
}
