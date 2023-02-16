import { IStudioRepository } from "../../../repositories/IStudioRepository";
import { IListStudioRequestDTO } from "./ListStudioDTO";

export class ListStudioUseCase {
  private studioRepository: IStudioRepository;

  constructor(studioRepository: IStudioRepository) {
    this.studioRepository = studioRepository;
  }

  async execute(data: IListStudioRequestDTO) {
    return await this.studioRepository.findAll(data);
  }
}
