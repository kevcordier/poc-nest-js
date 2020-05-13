import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from '../shared/logging.interceptor';
import { AstronautModule } from './astronaut/astronaut.module';
import { PlanetModule } from './planet/planet.module';

@Module({
  imports: [AstronautModule, PlanetModule],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
  exports: [AstronautModule, PlanetModule],
})
export class ApiModule {}
