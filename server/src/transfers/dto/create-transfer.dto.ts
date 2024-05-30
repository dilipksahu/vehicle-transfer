import { IsBoolean, IsInt } from 'class-validator';

export class CreateTransferDto {
  @IsInt()
  driverId: number;

  @IsInt()
  vehicleId: number;

  @IsBoolean()
  is_active: boolean;
}
