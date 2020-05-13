import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AstronautEntity } from './astronaut.entity';

@Entity('planet')
export class PlanetEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  color: string;

  @OneToMany(
    type => AstronautEntity,
    astronaut => astronaut.planet,
  )
  astronauts: AstronautEntity[];

  @Column({ default: true })
  isActive: boolean;
}
