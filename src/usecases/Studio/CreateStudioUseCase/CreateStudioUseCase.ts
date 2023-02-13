import { Studio } from "../../../entities/Studio";
import { IStudioRepository } from "../../../repositories/IStudioRepository";
import { ICreateStudioRequestDTO } from "./CreateStudioDTO";

export class CrateStudioUseCase {
  private studioRepository: IStudioRepository;

  constructor(studioRepository: IStudioRepository) {
    this.studioRepository = studioRepository;
  }

  async execute(data: ICreateStudioRequestDTO): Promise<Studio> {
    const existingStudio = await this.studioRepository.findByName(data.name);

    if (existingStudio) {
      throw new Error("Studio already exists");
    }

    const studio = new Studio(data);

    return await this.studioRepository.create(studio);
  }
}
