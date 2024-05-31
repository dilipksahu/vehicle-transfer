import { Controller, Get, Post, Body, Query, Patch, Param } from '@nestjs/common';
import { TransfersService } from './transfers.service';
import { CreateTransferDto } from './dto/create-transfer.dto';
import { Transfer } from '../entities/transfer.entity';

@Controller('api/transfers')
export class TransfersController {
  constructor(private readonly transfersService: TransfersService) {}

  @Get()
  findAll(@Query() query): Promise<{success,message,data:Transfer[]}> {
    return this.transfersService.findAll(query);
  }

  @Post()
  create(@Body() createTransferDto: CreateTransferDto): Promise<Transfer> {
    console.log(createTransferDto);
    
    return this.transfersService.create(createTransferDto);
  }

  @Patch(":id")
  inactiveStatus(@Param('id') id: number){
    return this.transfersService.inactiveStatus(id);
  }
}
