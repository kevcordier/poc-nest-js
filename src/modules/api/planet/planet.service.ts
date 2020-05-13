import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PlanetEntity } from '../../entity/planet.entity';
import { CreatePlanetDto } from './dto/create-planet.dto';
import { UpdatePlanetDto } from './dto/update-planet.dto';
import { FilterPlanetDto } from './dto/filter-planet.dto';

@Injectable()
export class PlanetService {
  constructor(
    @InjectRepository(PlanetEntity)
    private readonly PlanetRepository: Repository<PlanetEntity>,
  ) {}

  async create(data: CreatePlanetDto) {
    const planet = new PlanetEntity();
    planet.name = data.name;
    planet.color = data.color;
    await planet.save();
    return planet;
  }

  async show(id: string) {
    return PlanetEntity.findOne(id, {where: {isActive: true}});
  }

  async delete(id: string) {
    const planet = await PlanetEntity.findOne(id);
    planet.isActive = false;
    await planet.save();
    return planet;
  }

  async update(id, data: UpdatePlanetDto) {
    const planet = await PlanetEntity.findOne(id);
    planet.name = data.name;
    planet.color = data.color;
    await planet.save();
    return planet;
  }

  getFindOptions(page = 0, take = 10, sortField = 'id', sortOrder= 'DESC', filter: FilterPlanetDto = {}) {
    const skip = page * take;
    const order = {}
    order[sortField] = sortOrder;

    return {
      skip,
      order,
      take,
      where: filter,
      relations: ['astronauts']
    };
  }

  async getPlanets(page, take, sortField, sortOrder, filter) {
    return await this.PlanetRepository.find(this.getFindOptions(page, take, sortField, sortOrder, filter));
  }

  async getPlanetsCount(page, take, sortField, sortOrder, filter) {
    return await this.PlanetRepository.count(this.getFindOptions(page, take, sortField, sortOrder, filter));
  }
}
