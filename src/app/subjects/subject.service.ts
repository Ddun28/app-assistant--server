import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { backendDBManager } from 'src/dependency-injection';
import { ISubject, createSubjectModel } from 'src/models/subject.model';
import { randomUUID } from 'node:crypto';

@Injectable()
export class SubjectService {
  model = createSubjectModel(backendDBManager);

  async findAll() {
    try {
      const response = await this.model.find();
      return response.map((subject) => {
        delete subject.__v;
        return subject;
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

  async addSubject(
    subject: Omit<ISubject, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<void> {
    try {
      const id = randomUUID();
      const newSubject = {
        ...subject,
        createdAt: new Date(),
        updatedAt: new Date(),
        id
      };
      await this.model.insert(newSubject);
    } catch (error) {
      throw new HttpException(
        'Error al agregar la materia',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async update(id: string, body: Partial<ISubject>) {
    try {
      const find = await this.findById(id);
      if (!find) {
        throw new HttpException('Materia no encontrada', HttpStatus.NOT_FOUND);
      }
      const newSubject = { ...find, ...body, updatedAt: new Date() };
      return await this.model.updateById(id, { values: newSubject });
    } catch (error) {
      return error;
    }
  }

  async removeSubject(id: string) {
    try {
      return await this.model.deleteById(id);
    } catch (error) {
      return error;
    }
  }
}
