import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Driver } from '../entities/driver.entity';
import { CreateDriverDto } from './dto/create-driver.dto';

@Injectable()
export class DriversService {
  constructor(
    @InjectRepository(Driver)
    private driversRepository: Repository<Driver>,
  ) {}

  async findAll(): Promise<{success, message, data: Driver[]}> {
    const res =  await this.driversRepository.find();
    return {
        success: true,
        message: "Driver Data",
        data: res,
    }
  }

  findOne(id: number): Promise<Driver> {
    return this.driversRepository.findOneBy({ id });
  }

  async create(createDriverDto: CreateDriverDto): Promise<any> {
    const driver = this.driversRepository.create(createDriverDto);
    const res = this.driversRepository.save(driver);
    if (res){
        return {
            success: true,
            message: 'Driver created successfully',
            data: res,
        }
    }
    return {
        success: false,
        message: "Failed to create driver",
    }
    
  }

  async remove(id: number): Promise<void> {
    await this.driversRepository.delete(id);
  }
}
