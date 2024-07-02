import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { backendDBManager } from 'src/dependency-injection';
import { createSectionModel, ISection } from 'src/models/section.model';

@Injectable()
export class SectionService {
  model = createSectionModel(backendDBManager);

  async findAll() {
    try {
      const res = await this.model.find();
      return res.map((section) => {
        delete section.__v;
        return section;
      });
    } catch (error) {
      return error;
    }
  }

  async findById(id: string) {
    try {
      const res = await this.model.findById(id);
      delete res.__v;
      return res;
    } catch (error) {
      return error;
    }
  }

  async add(body: Omit<ISection, 'id' | 'createdAt' | 'updatedAt'>) {
    try {
      const newSection = {
        ...body,
        createdAt: new Date(),
        updatedAt: new Date(),
        id: randomUUID()
      };
      return await this.model.insert(newSection);
    } catch (error) {
      return error;
    }
  }

  async update(id: string, body: Partial<ISection>) {
    try {
      const find = await this.findById(id);
      const newSection = { ...find, ...body, updatedAt: new Date() };
      return await this.model.updateById(id, { values: newSection });
    } catch (error) {
      return error;
    }
  }

  async remove(id: string) {
    try {
      return this.model.deleteById(id);
    } catch (error) {
      return error;
    }
  }
}
