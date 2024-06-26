import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vehicle } from '../entities/vehicle.entity';
import { CreateVehicleDto } from './dto/create-vehicle.dto';  
import {TransfersService} from '../transfers/transfers.service';
@Injectable()
export class VehiclesService {
  constructor(
    @InjectRepository(Vehicle)
    private vehiclesRepository: Repository<Vehicle>,
  ) {}
  @Inject(forwardRef(() => TransfersService))
  private readonly transactionsService: TransfersService;

  async findAll(query): Promise<{success, message, data: Vehicle[]}> {
    const vehicles = await this.vehiclesRepository.find();
    let activeTransfers = [];
    if (query && query.is_active){
      const res = await this.transactionsService.findAll({is_active: true});    
      activeTransfers = res.data;
    }
    let availableVehicles = []
    if (activeTransfers.length > 0) {
      availableVehicles = this.getActiveVehicles(vehicles,activeTransfers);    
    }else{
      availableVehicles = [...vehicles]
    }
    return {
      success: true,
      message: "Vehicle Data",
      data: availableVehicles,
    }
  }

  async findOne(id: number): Promise<Vehicle> {
    return this.vehiclesRepository.findOne({ where: { id } });
  }

  async create(createVehicleDto: CreateVehicleDto): Promise<any> {
    try {
      const vehicle = await this.vehiclesRepository.create(createVehicleDto);
      const res = await this.vehiclesRepository.save(vehicle);
      if(res){
        return {
          success: true,
          message: "vehicle created successfully",
          data: res,
        }
      }
    } catch (error) {
      console.log(error);
      return {
        success: false,
        message: "Failed to create vehicle",
      }
    }
    
    
  }

  async remove(vehicleNumber: string): Promise<void> {
    await this.vehiclesRepository.delete(vehicleNumber);
  }

  getActiveVehicles(vehicles, activeTransfers) {
    const activeVehicles = vehicles.filter(vehicle => {
        return !activeTransfers.some(transfer => transfer.driver.id !== vehicle.id)
      }
    );
    return activeVehicles;
  }
}
