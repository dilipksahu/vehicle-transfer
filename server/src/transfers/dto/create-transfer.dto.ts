import { IsInt } from 'class-validator';

export class CreateTransferDto {
  @IsInt()
  driverId: number;

  @IsInt()
  vehicleId: number;
}
