import { Body, Controller, Get, Post, Put, Delete, Param } from '@nestjs/common';
import { SubjectService } from './subject.service';
import { ISubject } from 'src/models/subject.model';

@Controller('subjects')
export class SubjectController {
  constructor(private readonly subjectService: SubjectService) {}

  @Get()
  async findAll() {
    return await this.subjectService.findAll()
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.subjectService.findById(id);
  }

  @Post("/add")
  async add(@Body()body: Omit<ISubject, "id" | "createdAt" | "updatedAt">) {
    return await this.subjectService.addSubject(body);
  }

  @Put(":id")
  async update(
    @Param("id") id: string,
    @Body() body: Partial<ISubject>
  ) {
    return await this.subjectService.update(id, body);
  }

  @Delete(":id")
  async remove(@Param("id") id: string) {
    return await this.subjectService.removeSubject(id);
  }
}
