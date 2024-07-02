import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { backendDBManager } from 'src/dependency-injection';
import {
  createScheduleModel,
  ISchedule,
  IScheduleItem,
  ScheduleSchema
} from 'src/models/schedule.model';

@Injectable()
export class SchedulesService {
  model = createScheduleModel(backendDBManager);

  async findAll() {
    try {
      return (await this.model.find()).map((el) => {
        delete el.__v;
        return el;
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

  async add(body: Omit<ISchedule, 'id' | 'createdAt' | 'updatedAt'>) {
    const newSchedule = {
      ...body,
      createdAt: new Date(),
      updatedAt: new Date(),
      id: randomUUID(),
      schedule: Object.fromEntries(
        Object.keys(body.schedule).map((key: string) => {
          const newBody = body.schedule[key].map((item: IScheduleItem) => {
            return { ...item, id: randomUUID() };
          });
          return [key, newBody];
        })
      )
    };

    const valid = ScheduleSchema.safeParse(newSchedule);

    if (!valid.success) {
      const error = valid.error.issues;
      throw new HttpException(
        `Error: ${error.map((err) => `${err.message} on ${err.path[0]}.\n`)}`,
        HttpStatus.BAD_REQUEST
      );
    } else {
      return await this.model.insert(newSchedule);
    }
  }

  async update(id: string, body: Partial<ISchedule>) {
    try {
      const find = await this.findById(id);
      if (!find) {
        throw new HttpException('Horario no encontrado', HttpStatus.NOT_FOUND);
      }

      const newSchedule: ISchedule = {
        ...find,
        ...body,
        schedule: {
          ...find.schedule,
          ...Object.fromEntries(
            Object.keys(body.schedule).map((key: string) => {
              const newBody = body.schedule[key].map((item: IScheduleItem) => {
                return { ...item, id: randomUUID() };
              });
              return [key, newBody];
            })
          )
        },
        updatedAt: new Date()
      };

      await this.model.updateById(id, { values: newSchedule });
      return newSchedule;
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
