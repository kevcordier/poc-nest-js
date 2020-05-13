import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { AstronautEntity } from '../../entity/astronaut.entity';
import { CreateAstronautDto } from './dto/create-astronaut.dto';
import { UpdateAstronautDto } from './dto/update-astronaut.dto';
import { PlanetEntity } from '../../entity/planet.entity';
import { FilterAstronautDto } from './dto/filter-astronaut.dto';

@Injectable()
export class AstronautService {
    constructor(
        @InjectRepository(AstronautEntity)
        private readonly AstronautRepository: Repository<AstronautEntity>,
        @InjectRepository(PlanetEntity)
        private readonly PlanetRepository: Repository<PlanetEntity>,
    ) {
    }

    async create(data: CreateAstronautDto): Promise<AstronautEntity> {
        const astronaut = new AstronautEntity();
        astronaut.firstName = data.firstName;
        astronaut.lastName = data.lastName;
        console.log(data.birthDate);
        astronaut.birthDate = new Date(data.birthDate);
        astronaut.planet = await this.PlanetRepository.findOne({where: {id: data.planetId}});
        await astronaut.save();
        return astronaut;
    }

    async delete(id): Promise<AstronautEntity> {
        const astronaut = await AstronautEntity.findOne(id);
        astronaut.isActive = false;
        await astronaut.save();
        return astronaut;
    }

    getAstronautGrad(point) {

    }

    async update(id, data: UpdateAstronautDto): Promise<AstronautEntity> {
        const astronaut = await AstronautEntity.findOne(id);
        astronaut.firstName = data.firstName;
        astronaut.lastName = data.lastName;
        astronaut.birthDate = new Date(data.birthDate);
        await astronaut.save();
        return astronaut;
    }

    async show(id: string) {
        return await this.AstronautRepository.findOne(id, {where: {isActive: true}});
    }

    getFindOptions(page = 0, take = 10, sortField = 'id', sortOrder = 'DESC', filter: FilterAstronautDto = {}) {
        const skip = page * take;
        const order = {}
        order[sortField] = sortOrder;

        let where = {};
        if (filter.q) {
            const { q } = filter;
            where = [
                {firstName: Like(`%${q}%`), ...filter},
                {lastName: Like(`%${q}%`), ...filter},
                {...filter, planet: {name: Like(`%${q}%`)}},
            ]
        } else {
            where = filter;
        }
        console.log(where);

        return {
            skip,
            order,
            take,
            where,
        };
    }

    async getAstronauts(page, take, sortField, sortOrder, filter) {
        return await this.AstronautRepository.find(this.getFindOptions(page, take, sortField, sortOrder, filter));
    }

    async getAstronautsCount(page, take, sortField, sortOrder, filter) {
        return await this.AstronautRepository.count(this.getFindOptions(page, take, sortField, sortOrder, filter));
    }
}
