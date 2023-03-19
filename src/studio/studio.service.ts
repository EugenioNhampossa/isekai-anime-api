import { Injectable } from '@nestjs/common';
import { CreateStudioDto } from './dto/create-studio.dto';
import { UpdateStudioDto } from './dto/update-studio.dto';

@Injectable()
export class StudioService {
  create(createStudioDto: CreateStudioDto) {
    return 'This action adds a new studio';
  }

  findAll() {
    return `This action returns all studio`;
  }

  findOne(id: number) {
    return `This action returns a #${id} studio`;
  }

  update(id: number, updateStudioDto: UpdateStudioDto) {
    return `This action updates a #${id} studio`;
  }

  remove(id: number) {
    return `This action removes a #${id} studio`;
  }
}
