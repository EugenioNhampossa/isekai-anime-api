import { StudioRespository } from "../../../repositories/implementations/StudioRepository";
import { CreateStudioController } from "./CreateStudioController";
import { CreateStudioUseCase } from "./CreateStudioUseCase";

const studioRepository = new StudioRespository();

const createStudioUseCase = new CreateStudioUseCase(studioRepository);

const createStudioController = new CreateStudioController(createStudioUseCase);

export { createStudioController };
