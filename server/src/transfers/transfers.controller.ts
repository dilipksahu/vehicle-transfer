import { Controller, Get, Post, Body, Query } from '@nestjs/common';
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
    return this.transfersService.create(createTransferDto);
  }
}
