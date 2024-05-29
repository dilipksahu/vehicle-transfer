import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Transfer } from './transfer.entity';

@Entity()
export class Vehicle {
  @PrimaryGeneratedColumn()
  vehicleNumber: number;

  @Column()
  vehicleType: string;

  @Column()
  pucCertificate: string;

  @Column()
  insuranceCertificate: string;

  @OneToMany(() => Transfer, transfer => transfer.vehicle)
  transfers: Transfer[];
}
