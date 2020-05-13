import { Module } from '@nestjs/common';
import { PlanetResolver } from './planet.resolver';
import { PlanetService } from './planet.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlanetEntity } from '../../entity/planet.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PlanetEntity])],
  providers: [PlanetResolver, PlanetService],
})
export class PlanetModule {}
