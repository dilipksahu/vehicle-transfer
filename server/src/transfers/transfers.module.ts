import { Module } from '@nestjs/common';
import { TransfersController } from './transfers.controller';
import { TransfersService } from './transfers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transfer } from 'src/entities/transfer.entity';
import { DriversModule } from 'src/drivers/drivers.module';
import { VehiclesModule } from 'src/vehicles/vehicles.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Transfer]),
    DriversModule,
    VehiclesModule,
  ],
  controllers: [TransfersController],
  providers: [TransfersService]
})
export class TransfersModule {}
