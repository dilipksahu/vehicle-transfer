import { IsString } from 'class-validator';

export class CreateVehicleDto {
  @IsString()
  vehicleNumber: string;

  @IsString()
  vehicleType: string;

  pucCertificate?: string;
  
  insuranceCertificate?: string;
}
