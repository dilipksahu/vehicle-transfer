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

  async findAll(query): Promise<{success, message, data: Driver[]}> {
    const drivers =  await this.driversRepository.find();
    let activeTransfers = [];
    if (query && query.is_active){
      const res = await this.transactionsService.findAll({is_active: true});
      activeTransfers = res.data;
    }
    console.log(activeTransfers);
    
    let availableDrivers = []
    if (activeTransfers.length > 0) {
      console.log("pppppp");
      
      availableDrivers = await this.getActiveDrivers(drivers,activeTransfers);    
    }else{
      availableDrivers = [...drivers]
    }
    console.log(availableDrivers);
    
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
      const driverExist = await this.driversRepository.findOne({ where: {phoneNumber: createDriverDto.phoneNumber}});
      if(driverExist){
        return {
          success: false,
          message: "Driver already exists",
        }
      }
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
    const activeDrivers = drivers.filter(driver => {
        return !activeTransfers.some(transfer => transfer.driver.id === driver.id);
      }
    );
    return activeDrivers;
  }
}
