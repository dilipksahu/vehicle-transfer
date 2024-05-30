import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Driver } from '../entities/driver.entity';
import { CreateDriverDto } from './dto/create-driver.dto';
import { TransfersService } from '../transfers/transfers.service';

@Injectable()
export class DriversService {
  constructor(
    @InjectRepository(Driver)
    private driversRepository: Repository<Driver>,
  ) {}
  @Inject(forwardRef(() => TransfersService))
  private readonly transactionsService: TransfersService;

  async findAll(): Promise<{success, message, data: Driver[]}> {
    const drivers =  await this.driversRepository.find();
    const activeTransfers = await this.transactionsService.findAll({is_active: true});
    let availableDrivers = []
    if (activeTransfers.data.length > 0) {
      availableDrivers = this.getActiveDrivers(drivers,activeTransfers.data);    
    }else{
      availableDrivers = [...drivers]
    }
    return {
        success: true,
        message: "Driver Data",
        data: availableDrivers,
    }
  }

  findOne(id: number): Promise<Driver> {
    return this.driversRepository.findOneBy({ id });
  }

  async create(createDriverDto: CreateDriverDto): Promise<any> {
    try {
      const driver = await this.driversRepository.create(createDriverDto);
      const res = await this.driversRepository.save(driver);
      if (res){
          return {
              success: true,
              message: 'Driver created successfully',
              data: res,
          }
      }      
      
    } catch (error) {
      console.log(error);
      return {
        success: false,
        message: "Failed to create driver",
      }
    }
    
  }

  async remove(id: number): Promise<void> {
    await this.driversRepository.delete(id);
  }

  getActiveDrivers(drivers, activeTransfers) {
    const activeDrivers = drivers.filter(driver =>
      activeTransfers.some(transfer => transfer.driver.id !== driver.id)
    );
    return activeDrivers;
  }
}
