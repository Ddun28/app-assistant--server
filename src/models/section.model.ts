import tsValidMongoDb, { Schema } from 'ts-valid-mongodb';
import { z } from 'zod';

const SectionSchema = z.object({
  name: z.string().trim(),
  students: z.array(z.string().trim()).min(1), // students _id
  schedule: z.string().trim(),
  createdAt: z.date(),
  updatedAt: z.date()
});

type ISection = z.infer<typeof SectionSchema>;

const createSectionModel = (db: tsValidMongoDb) =>
  db.createModel(
    new Schema('section', SectionSchema, {
      versionKey: true,
      indexes: [{ key: { id: 1 }, unique: true }]
    })
  );

export { ISection, createSectionModel, SectionSchema };
