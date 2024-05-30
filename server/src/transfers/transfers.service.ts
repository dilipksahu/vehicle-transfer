import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transfer } from '../entities/transfer.entity';
import { CreateTransferDto } from './dto/create-transfer.dto';
import {VehiclesService} from '../vehicles/vehicles.service';
import {DriversService} from '../drivers/drivers.service';
@Injectable()
export class TransfersService {
  constructor(
    @InjectRepository(Transfer)
    private transfersRepository: Repository<Transfer>,
    private driversService: DriversService,
    private vehiclesService: VehiclesService,
  ) {}

  async findAll(): Promise<{success,message,data:Transfer[]}> {
    const res = await this.transfersRepository.find({
      relations: ['driver', 'vehicle'],
    });
    return {
      success: true,
      message: "Transfer Data",
      data: res,
    }
  }

  async create(createTransferDto: CreateTransferDto): Promise<any> {
    const ckeckTransfer = await this.isTransferExist(createTransferDto.driverId, createTransferDto.vehicleId);
    if (ckeckTransfer){
      return {
        success: false,
        message: "Transfer already exists",
      }
    }
    const driver = await this.driversService.findOne(createTransferDto.driverId);
    const vehicle = await this.vehiclesService.findOne(createTransferDto.vehicleId);
    const transfer = this.transfersRepository.create({
        driver,
        vehicle,
        is_active: true,
        transferDate: new Date(), // Set the transfer date to the current date
      });
    const res = this.transfersRepository.save(transfer);
    return {
      success: true,
      message: "Transfer created successfully",
      data: res,
    }
  }

  async isTransferExist(driver_id: number, vehicle_id: number): Promise<boolean> {
    const res = await this.transfersRepository.find({
      where: {
        driver: { id: driver_id },
        vehicle: { id: vehicle_id },
        is_active: true,
      },
    });
    return !!res;
  } 
}
