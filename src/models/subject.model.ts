import tsValidMongoDb, { Schema } from 'ts-valid-mongodb';
import { z } from 'zod';

const SubjectSchema = z.object({
  name: z.string().min(3).max(30),
  teachers: z.array(z.string()),
  createdAt: z.date(),
  updatedAt: z.date()
});

type ISubject = z.infer<typeof SubjectSchema>;

const createSubjectModel = (db: tsValidMongoDb) =>
  db.createModel(
    new Schema('subject', SubjectSchema, {
      versionKey: true,
      indexes: [{ key: { id: 1 }, unique: true }]
    })
  );

export { ISubject, createSubjectModel, SubjectSchema };
