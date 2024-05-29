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

  findAll(): Promise<Driver[]> {
    return this.driversRepository.find();
  }

  findOne(id: number): Promise<Driver> {
    return this.driversRepository.findOneBy({ id });
  }

  async create(createDriverDto: CreateDriverDto): Promise<Driver> {
    const driver = this.driversRepository.create(createDriverDto);
    return this.driversRepository.save(driver);
  }

  async remove(id: number): Promise<void> {
    await this.driversRepository.delete(id);
  }
}
