import tsValidMongoDb, { Schema } from 'ts-valid-mongodb';
import { z } from 'zod';

const ScheduleItemSchema = z.object({
  id: z.string().trim(),
  hour: z.string(),
  subject: z.string().trim(),
  teacherId: z.string().trim()
});

const DaysOfWeekSchema = z.record(
  z.enum(['lunes', 'martes', 'miercoles', 'jueves', 'viernes']),
  z.array(ScheduleItemSchema)
);

const ScheduleSchema = z.object({
  name: z.string().trim(),
  section: z.string().trim(),
  schedule: DaysOfWeekSchema,
  createdAt: z.date(),
  updatedAt: z.date(),
  id: z.string().trim()
});

type ISchedule = z.infer<typeof ScheduleSchema>;
type IScheduleItem = z.infer<typeof ScheduleItemSchema>;
const createScheduleModel = (db: tsValidMongoDb) =>
  db.createModel(
    new Schema('schedule', ScheduleSchema, {
      versionKey: true,
      indexes: [{ key: { id: 1 }, unique: true }]
    })
  );

export { ISchedule, IScheduleItem, createScheduleModel, ScheduleSchema };
