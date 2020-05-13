import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';

import { AstronautEntity } from '../../entity/astronaut.entity';
import { AstronautService } from './astronaut.service';

@Resolver(() => AstronautEntity)
export class AstronautResolver {
  constructor(private astronautService: AstronautService) {}

  @Mutation()
  async createAstronaut(
    @Args('firstName') firstName,
    @Args('lastName') lastName,
    @Args('birthDate') birthDate,
    @Args('points') points,
    @Args('planetId') planetId,
  ): Promise<AstronautEntity> {
    return this.astronautService.create({
      firstName,
      lastName,
      birthDate,
      points,
      planetId,
    });
  }

  @Mutation()
  async updateAstronaut(
    @Args('id') id,
    @Args('firstName') firstName,
    @Args('lastName') lastName,
    @Args('birthDate') birthDate,
    @Args('points') points,
    @Args('planetId') planetId,
  ): Promise<AstronautEntity> {
    return this.astronautService.update(id, { firstName, lastName, birthDate, points, planetId });
  }

  @Mutation()
  async deleteAstronaut(@Args('id') id): Promise<AstronautEntity> {
    return this.astronautService.delete(id);
  }

  @Query()
  async allAstronauts(
      @Args('page') page: number,
      @Args('perPage') perPage: number,
      @Args('sortField') sortField: string,
      @Args('sortOrder') sortOrder: string,
      @Args('filter') filter: object,
  ): Promise<AstronautEntity[]> {
    return await this.astronautService.getAstronauts(page, perPage, sortField, sortOrder, filter);
  }

  @Query()
  async _allAstronautsMeta(
      @Args('page') page: number,
      @Args('perPage') perPage: number,
      @Args('sortField') sortField: string,
      @Args('sortOrder') sortOrder: string,
      @Args('filter') filter: object
  ): Promise<object> {
    return {
      count: await this.astronautService.getAstronautsCount(page, perPage, sortField, sortOrder, filter)
    };
  }

  @Query()
  async Astronaut(@Args('id') id: string): Promise<AstronautEntity> {
    return await this.astronautService.show(id);
  }
}
