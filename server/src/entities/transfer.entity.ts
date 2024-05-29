import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Driver } from './driver.entity';
import { Vehicle } from './vehicle.entity';

@Entity()
export class Transfer {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Driver, driver => driver.transfers)
  driver: Driver;

  @ManyToOne(() => Vehicle, vehicle => vehicle.transfers)
  vehicle: Vehicle;

  @CreateDateColumn()
  transferDate: Date;
}
