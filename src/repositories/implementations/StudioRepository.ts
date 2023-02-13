import { Studio } from "@prisma/client";
import { IStudioFilter } from "../../@types/IStudioFilter";
import { prisma } from "../../prisma";
import { IStudioData, IStudioRepository } from "../IStudioRepository";

export class StudioRespository implements IStudioRepository {
  async create(studio: Studio): Promise<Studio> {
    return await prisma.studio.create({
      data: {
        id: studio.id,
        name: studio.name,
      },
    });
  }
  update(studio: Studio): Promise<void> {
    throw new Error("Method not implemented.");
  }
  delete(id: Studio): Promise<void> {
    throw new Error("Method not implemented.");
  }
  findAll(filter: IStudioFilter): Promise<IStudioData> {
    throw new Error("Method not implemented.");
  }
  findUnique(id: string): Promise<Studio> {
    throw new Error("Method not implemented.");
  }
  async findByName(name: string): Promise<Studio> {
    return prisma.studio.findUnique({
      where: {
        name,
      },
    });
  }
}
