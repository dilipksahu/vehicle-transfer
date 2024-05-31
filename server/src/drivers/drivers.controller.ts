import { Controller, Get, Post, Body, Param, UseInterceptors, UploadedFile, Query } from '@nestjs/common';
import { DriversService } from './drivers.service';
import { CreateDriverDto } from './dto/create-driver.dto';
import { Driver } from '../entities/driver.entity';
import { FileInterceptor } from '@nestjs/platform-express'
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('api/drivers')
export class DriversController {
  constructor(private readonly driversService: DriversService) {}

  @Get()
  findAll(@Query() query): Promise<{success,message,data: Driver[]}> {
    return this.driversService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Driver> {
    return this.driversService.findOne(+id);
  }

  @Post()
  @UseInterceptors(FileInterceptor('profilePhoto', {
    storage: diskStorage({
      destination: './uploads/profilePhotos',
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = extname(file.originalname);
        cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
      }
    })
  }))
  async create(@Body() createDriverDto: CreateDriverDto, @UploadedFile() file: Express.Multer.File): Promise<Driver> {
    if (file) {
      createDriverDto.profilePhoto = file.filename;
    }
    return this.driversService.create(createDriverDto);
  }
}


