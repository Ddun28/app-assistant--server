import tsValidMongoDb, { Schema } from 'ts-valid-mongodb';
import { z } from 'zod';

const UserSchema = z.object({
  id: z.string().trim(),
  firstname: z.string().min(3).max(15),
  lastname: z.string().min(3).max(15),
  document: z.string().trim(),
  password: z.string().min(8),
  access: z.enum(['admin', 'student', 'teacher']),
  // doc_type: z.enum(["CI", "CIR"]),
  createdAt: z.date(),
  updatedAt: z.date()
});

type IUser = z.infer<typeof UserSchema>;

const createUserModel = (db: tsValidMongoDb) =>
  db.createModel(
    new Schema('user', UserSchema, {
      versionKey: true,
      indexes: [{ key: { id: 1 }, unique: true }]
    })
  );

export { IUser, createUserModel, UserSchema };
