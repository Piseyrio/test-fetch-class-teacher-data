// src/lib/zod.ts
import { z } from "zod";


export const studentSchema = z.object({
  firstname: z.string().min(1, "First name is required"),
  lastname: z.string().min(1, "Last name is required"),
  classId: z.coerce.number().int().positive().optional(), // comes from <select>
  teacherId: z.coerce.number().int().positive().optional(),
  subjectId: z.coerce.number().int().positive().optional(), // comes from <select>
});

export type StudentSchema = z.infer<typeof studentSchema>;

export const studentUpdateSchema = studentSchema.partial().extend({
  id: z.coerce.number().int().positive(),
});
export type StudentUpdateSchema = z.infer<typeof studentUpdateSchema>;

export const teacherSchema = z.object({
  firstname: z.string().min(1, "First name is required"),
  lastname: z.string().min(1, "Last name is required"),
  classId: z.coerce.number().int().positive().optional(),   // comes from <select>
});
export type TeacherSchema = z.infer<typeof teacherSchema>

export const classSchema = z.object({
  name: z.string().min(1, "Class name is required"),
  teacherId: z.coerce.number().int().positive().optional(),
});
export type ClassSchema = z.infer<typeof classSchema>;

export const subjectSchema = z.object({
    name: z.string().min(1, "Subject name is required"),
  teacherId: z.coerce.number().int().positive().optional(),
});
export type SubjectSchema = z.infer<typeof subjectSchema>;