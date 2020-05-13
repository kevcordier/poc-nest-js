import { TypeOrmModule } from '@nestjs/typeorm';
import { AstronautEntity } from '../../entity/astronaut.entity';
import { AstronautService } from './astronaut.service';
import { AstronautResolver } from './astronaut.resolver';
import { Module } from '@nestjs/common';
import { PlanetEntity } from '../../entity/planet.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AstronautEntity, PlanetEntity])],
  providers: [AstronautService, AstronautResolver],
})
export class AstronautModule {}
