import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { SchedulesService } from './schedules.service';
import { ISchedule } from 'src/models/schedule.model';
import { JwtGuard } from 'src/guards/jwt.guard';

@Controller('schedules')
export class SchedulesController {
  constructor(private readonly schedulesService: SchedulesService) {}

  @UseGuards(JwtGuard)
  @Get()
  async findAll() {
    return await this.schedulesService.findAll();
  }

  @UseGuards(JwtGuard)
  @Get(":id")
  async findOne(@Param("id") id: string) {
    return await this.schedulesService.findById(id);
  }

  @UseGuards(JwtGuard)
  @Post("add")
  async add(@Body() body: Omit<ISchedule, "id" | "createdAt" | "updatedAt">) {
    return await this.schedulesService.add(body);
  }

  @UseGuards(JwtGuard)
  @Put(":id")
  async update(@Param("id") id: string, @Body() body: Omit<ISchedule, "createdAt" | "updatedAt">) {
    return await this.schedulesService.update(id, body);
  }

  @UseGuards(JwtGuard)
  @Delete(":id")
  async remove(@Param("id") id: string) {
    return await this.schedulesService.remove(id);
  }
}
