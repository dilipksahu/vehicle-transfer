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

  findAll(): Promise<Transfer[]> {
    return this.transfersRepository.find({
      relations: ['driver', 'vehicle'],
    });
  }

  async create(createTransferDto: CreateTransferDto): Promise<any> {
    const driver = await this.driversService.findOne(createTransferDto.driverId);
    const vehicle = await this.vehiclesService.findOne(createTransferDto.vehicleId);
    const transfer = this.transfersRepository.create({
        driver,
        vehicle,
        transferDate: new Date(), // Set the transfer date to the current date
      });
    return this.transfersRepository.save(transfer);
  }
}
