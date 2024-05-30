import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Transfer } from './transfer.entity';

@Entity()
export class Vehicle {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column({ unique: true })
  vehicleNumber: string;

  @Column()
  vehicleType: string;

  @Column()
  pucCertificate: string;

  @Column()
  insuranceCertificate: string;

  @OneToMany(() => Transfer, transfer => transfer.vehicle)
  transfers: Transfer[];
    // @Column("simple-json", { nullable: true })
    // transfers: { from: string; to: string; date: Date }[];
}
