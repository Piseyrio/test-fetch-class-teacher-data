// src/lib/actions/student.actions.ts
"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import {
  studentSchema,
  studentUpdateSchema,
  StudentSchema,
  StudentUpdateSchema,
  TeacherSchema,
  teacherSchema,
  classSchema,
  ClassSchema,
  subjectSchema,
  SubjectSchema,
} from "@/lib/zod";
import { redirect } from "next/navigation";

// Get options for selects
export async function listClassesTeachersSubjects() {
  const [classes, teachers, subjects] = await Promise.all([
    prisma.class.findMany({
      select: { id: true, name: true },
      orderBy: { name: "asc" },
    }),
    prisma.teacher.findMany({
      select: { id: true, firstname: true, lastname: true },
      orderBy: [{ firstname: "asc" }, { lastname: "asc" }],
    }),
    prisma.subject.findMany({
      select: { id: true, name: true },
      orderBy: { name: "asc" },
    }),
  ]);
  return {
    classes,
    teachers: teachers.map((t) => ({
      id: t.id,
      name: `${t.firstname} ${t.lastname}`,
    })),
    subjects,
  };
}

// export async function listTeachers() {
//   const [classes, teachers] = await Promise.all([
//     prisma.class.findMany({ select: { id: true, name: true }, orderBy: { name: "asc" } }),
//     prisma.teacher.findMany({
//       select: { id: true, firstname: true, lastname: true },
//       orderBy: [{ firstname: "asc" }, { lastname: "asc" }],
//     }),
//   ]);
//   return {
//     classes,
//     teachers: teachers.map(t => ({ id: t.id, name: `${t.firstname} ${t.lastname}` })),
//   };
// }

// export async function listClass() {
//   const [classes, teachers] = await Promise.all([
//     prisma.class.findMany({ select: { id: true, name: true }, orderBy: { name: "asc" } }),
//     prisma.teacher.findMany({
//       select: { id: true, firstname: true, lastname: true },
//       orderBy: [{ firstname: "asc" }, { lastname: "asc" }],
//     }),
//   ]);
//   return {
//     classes,
//     teachers: teachers.map(t => ({ id: t.id, name: `${t.firstname} ${t.lastname}` })),
//   };
// }

export async function getStudentById(id: number) {
  const student = await prisma.student.findUnique({
    where: { id },
    include: { class: true, teacher: true, subject:true },
  });
  if (!student) throw new Error("Student not found");
  return student;
}

export async function createStudent(data: StudentSchema) {
  const parsed = studentSchema.safeParse(data);
  if (!parsed.success) {
    throw new Error("Invalid data");
  }
  const payload = parsed.data;

  await prisma.student.create({
    data: {
      firstname: payload.firstname,
      lastname: payload.lastname,
      classId: payload.classId ?? null,
      teacherId: payload.teacherId ?? null,
      subjectId: payload.subjectId ?? null,
    },
  });

  revalidatePath("/dashboard/students");
  redirect("/dashboard/students"); // go back to list after create
}

export async function updateStudent(data: StudentUpdateSchema) {
  const parsed = studentUpdateSchema.safeParse(data);
  if (!parsed.success) {
    throw new Error("Invalid data");
  }
  const { id, ...rest } = parsed.data;

  await prisma.student.update({
    where: { id },
    data: {
      ...rest,
      classId: rest.classId ?? null,
      teacherId: rest.teacherId ?? null,

    },
  });

  revalidatePath(`/dashboard/students/${id}`);
  revalidatePath("/dashboard/students");
  redirect(`/dashboard/students/${id}`);
}

export async function createTeacher(data: TeacherSchema) {
  const parsed = teacherSchema.safeParse(data);
  if (!parsed.success) {
    throw new Error("Invalid data");
  }
  const payload = parsed.data;
  await prisma.teacher.create({
    data: {
      firstname: payload.firstname,
      lastname: payload.lastname,
      //   classId: payload.classId ?? null,
    },
  });
  revalidatePath("/dashboard/teacher");
  redirect("/dashboard/teacher"); // go back to list after create
}

export async function createClass(data: ClassSchema) {
  const parsed = classSchema.safeParse(data);
  if (!parsed.success) {
    throw new Error("Invalid data");
  }
  const payload = parsed.data;
  await prisma.class.create({
    data: {
      name: payload.name,
      //   classId: payload.classId ?? null,
    },
  });
  revalidatePath("/dashboard/class");
  redirect("/dashboard/class"); // go back to list after create
}

export async function createSubject(data: SubjectSchema) {
  const parsed = subjectSchema.safeParse(data);
  if (!parsed.success) {
    throw new Error("Invalid data");
  }
  const payload = parsed.data;
  await prisma.subject.create({
    data: {
      name: payload.name,
      //   classId: payload.classId ?? null,
    },
  });
  revalidatePath("/dashboard/subject");
  redirect("/dashboard/subject"); // go back to list after create
}
