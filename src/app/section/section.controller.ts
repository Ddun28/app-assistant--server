import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { SectionService } from './section.service';
import { ISection } from 'src/models/section.model';
import { JwtGuard } from 'src/guards/jwt.guard';

@Controller('section')
export class SectionController {
  constructor(private readonly sectionService: SectionService) {}

  @UseGuards(JwtGuard)
  @Get()
  async findAll() {
    return await this.sectionService.findAll();
  }
  
  @UseGuards(JwtGuard)
  @Get(":id")
  async findOne(@Param("id") id: string) {
    return await this.sectionService.findById(id);
  }

  @UseGuards(JwtGuard)
  @Post("add")
  async add(@Body()body: Omit<ISection, "id" | "createdAt" | "updatedAt">) {
    return await this.sectionService.add(body);
  }

  @UseGuards(JwtGuard)
  @Put(":id")
  async update(
    @Param("id") id: string,
    @Body() body: Partial<ISection>
  ) {
    return await this.sectionService.update(id, body);
  }
  
  @UseGuards(JwtGuard)
  @Delete(":id")
  async remove(
    @Param("id") id: string,
  ) {
    return await this.sectionService.remove(id);
  }

}
