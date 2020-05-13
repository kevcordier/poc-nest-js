
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class AstronautFilter {
    q?: string;
    firstName?: string;
    lastName?: string;
    planet?: PlanetFilter;
}

export class PlanetFilter {
    q?: string;
    id?: string;
    ids?: string[];
    name?: string;
}

export class Astronaut {
    id: string;
    firstName: string;
    lastName: string;
    birthDate?: Date;
    planet?: Planet;
}

export class Deleted {
    delete: boolean;
}

export class ListMetadata {
    count: number;
}

export abstract class IMutation {
    abstract createAstronaut(firstName: string, lastName: string, birthDate: Date, planetId?: string): Astronaut | Promise<Astronaut>;

    abstract updateAstronaut(id: string, firstName: string, lastName: string, birthDate: Date, planetId?: string): Astronaut | Promise<Astronaut>;

    abstract deleteAstronaut(id: string): Astronaut | Promise<Astronaut>;

    abstract createPlanet(name: string, color: string): Planet | Promise<Planet>;

    abstract updatePlanet(id?: string, name: string, color: string): Planet | Promise<Planet>;

    abstract deletePlanet(id?: string): Planet | Promise<Planet>;
}

export class Planet {
    id: string;
    name: string;
    color: string;
    astronauts?: Astronaut[];
}

export abstract class IQuery {
    abstract Astronaut(id?: string): Astronaut | Promise<Astronaut>;

    abstract allAstronauts(page?: number, perPage?: number, sortField?: string, sortOrder?: string, filter?: AstronautFilter): Astronaut[] | Promise<Astronaut[]>;

    abstract _allAstronautsMeta(page?: number, perPage?: number, sortField?: string, sortOrder?: string, filter?: AstronautFilter): ListMetadata | Promise<ListMetadata>;

    abstract Planet(id?: string): Planet | Promise<Planet>;

    abstract allPlanets(page?: number, perPage?: number, sortField?: string, sortOrder?: string, filter?: PlanetFilter): Planet[] | Promise<Planet[]>;

    abstract _allPlanetsMeta(page?: number, perPage?: number, sortField?: string, sortOrder?: string, filter?: PlanetFilter): ListMetadata | Promise<ListMetadata>;
}
