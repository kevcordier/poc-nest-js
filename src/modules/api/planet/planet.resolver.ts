import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { PlanetService } from './planet.service';
import { PlanetEntity } from '../../entity/planet.entity';

@Resolver('Planet')
export class PlanetResolver {
  constructor(private planetService: PlanetService) {}

  @Query()
  async _allPlanetsMeta(
      @Args('page') page: number,
      @Args('perPage') perPage: number,
      @Args('sortField') sortField: string,
      @Args('sortOrder') sortOrder: string,
      @Args('filter') filter: object
  ): Promise<object> {
    return {
      count: await this.planetService.getPlanetsCount(page, perPage, sortField, sortOrder, filter)
    };
  }

  @Query()
  async allPlanets(
      @Args('page') page: number,
      @Args('perPage') perPage: number,
      @Args('sortField') sortField: string,
      @Args('sortOrder') sortOrder: string,
      @Args('filter') filter: object
  ): Promise<PlanetEntity[]> {
    return await this.planetService.getPlanets(page, perPage, sortField, sortOrder, filter);
  }

  @Mutation()
  async createPlanet(@Args('name') name, @Args('color') color): Promise<PlanetEntity> {
    return this.planetService.create({ name, color });
  }

  @Mutation()
  async updatePlanet(@Args('id') id, @Args('name') name, @Args('color') color): Promise<PlanetEntity> {
    return this.planetService.update(id, { name, color });
  }

  @Mutation()
  async deletePlanet(@Args('id') id): Promise<PlanetEntity> {
    return this.planetService.delete(id);
  }

  @Query()
  async Planet(@Args('id') id: string): Promise<PlanetEntity> {
    return await this.planetService.show(id);
  }
}
