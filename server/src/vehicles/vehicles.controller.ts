import { Controller, Get, Post, Body, Param, UseInterceptors, UploadedFile, UploadedFiles, Query } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { Vehicle } from '../entities/vehicle.entity';
import { AnyFilesInterceptor, FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('api/vehicles')
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @Get()
  findAll(@Query() query): Promise<{success,message,data:Vehicle[]}> {
    return this.vehiclesService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Vehicle> {
    return this.vehiclesService.findOne(id);
  }

  @Post()
  @UseInterceptors(
    AnyFilesInterceptor({
      storage: diskStorage({
        destination: (req, file, cb) => {
          if (file.fieldname === 'pucCertificate') {
            cb(null, './uploads/pucCertificates');
          } else if (file.fieldname === 'insuranceCertificate') {
            cb(null, './uploads/insuranceCertificates');
          }
        },
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
      fileFilter: (req, file, cb) => {
        if (
          file.fieldname === 'pucCertificate' ||
          file.fieldname === 'insuranceCertificate'
        ) {
          cb(null, true);
        } else {
          cb(new Error('Unexpected field'), false);
        }
      },
    }),
  )
  async create(
    @Body() createVehicleDto: CreateVehicleDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ): Promise<Vehicle> {
    console.log("create vehicle");
    files.forEach((file) => {
      
      if (file.fieldname === 'pucCertificate') {
        createVehicleDto.pucCertificate = file.filename;
      } else if (file.fieldname === 'insuranceCertificate') {
        createVehicleDto.insuranceCertificate = file.filename;
      }
    });
    return this.vehiclesService.create(createVehicleDto);
  }
}
