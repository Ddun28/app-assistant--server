import tsValidMongoDb, { Schema } from 'ts-valid-mongodb';
import { z } from 'zod';

const StudentAssistanceSchema = z.object({
  student: z.string().trim(),
  status: z.enum(['present', 'absent', 'justified', 'late'])
});

const AssistanceSchema = z.object({
  teacher: z.string().trim(),
  section: z.string().trim(),
  subject: z.string().trim(),
  date: z.date(),
  students: z.array(StudentAssistanceSchema),
  createdAt: z.date(),
  updatedAt: z.date()
});

type IAssistance = z.infer<typeof AssistanceSchema>;

const createAssistanceModel = (db: tsValidMongoDb) =>
  db.createModel(
    new Schema('assistance', AssistanceSchema, {
      versionKey: true,
      indexes: [{ key: { id: 1 }, unique: true }]
    })
  );

export { IAssistance, createAssistanceModel, AssistanceSchema };
