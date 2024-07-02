import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { IUser } from 'src/models/user.model';
import { JwtGuard } from 'src/guards/jwt.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtGuard)
  @Get()
  async findAll() {
    return await this.usersService.findAll()
  }

  @UseGuards(JwtGuard)
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.usersService.findById(id);
  }
  
  @UseGuards(JwtGuard)
  @Post("/add")
  async add(@Body() body: Omit<IUser, "id" | "createdAt" | "updatedAt">) {
    return await this.usersService.addUser(body);
  }

  @UseGuards(JwtGuard)
  @Put(":id")
  async update(
    @Param("id") id: string,
    @Body() body: Partial<IUser>
  ) {
    return await this.usersService.update(id, body);
  }
  
  @UseGuards(JwtGuard)
  @Delete(":id")
  async remove(
    @Param("id") id: string,
  ) {
    return await this.usersService.remove(id);
  }

  @Get('qr/:id')
  async getQr(@Param("id") id: string) {
    const qrCodeDataURL= await this.usersService.getQr(id);
    return {
      code: qrCodeDataURL.split(",")[1],
      image: qrCodeDataURL
    }
  }
}
