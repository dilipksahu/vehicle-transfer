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

  async findAll(): Promise<{success, message, data: Vehicle[]}> {
    const res = await this.vehiclesRepository.find();
    return {
      success: true,
      message: "Vehicle Data",
      data: res,
    }
  }

  async findOne(id: number): Promise<Vehicle> {
    return this.vehiclesRepository.findOne({ where: { id } });
  }

  async create(createVehicleDto: CreateVehicleDto): Promise<any> {
    const vehicle = await this.vehiclesRepository.create(createVehicleDto);
    const res = await this.vehiclesRepository.save(vehicle);
    if(res){
      return {
        success: true,
        message: "vehicle created successfully",
        data: res,
      }
    }
    return {
      success: false,
      message: "Failed to create vehicle"
    }
    
  }

  async remove(vehicleNumber: string): Promise<void> {
    await this.vehiclesRepository.delete(vehicleNumber);
  }
}
