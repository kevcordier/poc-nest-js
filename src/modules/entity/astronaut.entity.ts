import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PlanetEntity } from './planet.entity';

enum Grade {
  ROOKIE,
  ENSIGN,
  LIEUTENANT,
  LIEUTENANT_COMMANDER,
  COMMANDER,
  CAPTAIN,
  FLEET_CAPTAIN,
  COMMODORE,
  REAR_ADMIRAL,
  VICE_ADMIRAL,
  ADMIRAL,
  FLEET_ADMIRAL,
  FLEET_ADMIRAL_1_STAR,
  FLEET_ADMIRAL_2_STARS,
  FLEET_ADMIRAL_3_STARS,
}

@Entity('astronaut')
export class AstronautEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  birthDate: Date;

  /*@Column({
    default: 0
  })
  points: number = 0;

  @Column({
    default: Grade.ROOKIE
  })
  grade: Grade = Grade.ROOKIE;*/

  @ManyToOne(
    type => PlanetEntity,
    planet => planet.astronauts,
    {
      eager: true,
    },
  )
  planet: PlanetEntity;

  @Column({ default: true })
  isActive: boolean;
}
