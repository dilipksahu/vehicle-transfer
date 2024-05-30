import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vehicle } from '../entities/vehicle.entity';
import { CreateVehicleDto } from './dto/create-vehicle.dto';  

@Injectable()
export class VehiclesService {
  constructor(
    @InjectRepository(Vehicle)
    private vehiclesRepository: Repository<Vehicle>,
  ) {}

  findAll(): Promise<Vehicle[]> {
    return this.vehiclesRepository.find();
  }

  findOne(vehicleNumber: number): Promise<Vehicle> {
    return this.vehiclesRepository.findOneBy({ vehicleNumber });
  }

  async create(createVehicleDto: CreateVehicleDto): Promise<Vehicle> {
    const vehicle = this.vehiclesRepository.create(createVehicleDto);
    return this.vehiclesRepository.save(vehicle);
  }

  async remove(vehicleNumber: number): Promise<void> {
    await this.vehiclesRepository.delete(vehicleNumber);
  }
}
