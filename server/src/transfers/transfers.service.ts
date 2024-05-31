import { Inject, Injectable, forwardRef } from '@nestjs/common';
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

  ) {}
  @Inject(forwardRef(() => DriversService) )
  private readonly driversService: DriversService;

  @Inject(forwardRef(() => VehiclesService) )
  private readonly vehiclesService: VehiclesService;

  async findAll(query): Promise<{success,message,data:Transfer[]}> {
    let qObject = {
      relations: ['driver', 'vehicle'],
    }
    console.log(query);
    
    if (query && query.is_active){
      qObject['where'] = {};
      qObject['where']['is_active'] = true;
    }
    console.log('qqqq',qObject);
    
    const res = await this.transfersRepository.find(qObject);
    return {
      success: true,
      message: "Transfer Data",
      data: res,
    }
  }

  async create(createTransferDto: CreateTransferDto): Promise<any> {
    console.log(createTransferDto);
    
    const ckeckTransfer = await this.isTransferExist(createTransferDto.driverId, createTransferDto.vehicleId);
    console.log(ckeckTransfer);
    
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
    const res = await this.transfersRepository.save(transfer);
    return {
      success: true,
      message: "Transfer created successfully",
      data: res,
    }
  }

  async isTransferExist(driver_id: number, vehicle_id: number): Promise<boolean> {
    const res = await this.transfersRepository.find({
      where: {
        driver: {id: driver_id },
        vehicle: { id: vehicle_id },
        is_active: true,
      },
    });
    return res.length > 0;
  } 

  async inactiveStatus(id: number){
    await this.transfersRepository.update(id,{ is_active: false });
    return await this.findAll(null);
  }
}
