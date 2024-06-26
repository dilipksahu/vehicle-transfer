import { Module, forwardRef } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Driver } from './entities/driver.entity';
import { Vehicle } from './entities/vehicle.entity';
import { Transfer } from './entities/transfer.entity';
import { DriversModule } from './drivers/drivers.module';
import { VehiclesModule } from './vehicles/vehicles.module';
import { TransfersModule } from './transfers/transfers.module';
import { ConfigModule } from '@nestjs/config';
console.log({ type: "postgres",
host: process.env.DB_HOST,
port: parseInt(process.env.DB_PORT, 10),
username: process.env.DB_USER,
password: process.env.DB_PASSWORD,
database: process.env.DB_NAME,});

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [Driver, Vehicle, Transfer],
      synchronize: true,
    }),
    forwardRef(() => DriversModule), 
    VehiclesModule, 
    TransfersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
