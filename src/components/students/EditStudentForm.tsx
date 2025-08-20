// src/components/students/EditStudentForm.tsx
"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { studentUpdateSchema, StudentUpdateSchema } from "@/lib/zod";
import { toast } from "sonner";
import { updateStudent } from "@/lib/actions";

type Option = { id: number; name: string};

export function EditStudentForm({
  student,
  classes,
  teachers,
  subjects,
}: {
  student: any;
  classes: Option[];
  teachers: Option[];
  subjects: Option[];
}) {
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<StudentUpdateSchema>({
    resolver: zodResolver(studentUpdateSchema),
    defaultValues: {
      id: student.id,
      firstname: student.firstname,
      lastname: student.lastname,
      classId: student.classId ?? undefined,
      teacherId: student.teacherId ?? undefined,
      subjectId: student.subjectId ?? undefined,
    },
  });

  const onSubmit = (values: StudentUpdateSchema) => {
    startTransition(async () => {
      try {
        await updateStudent(values); // this redirects on success
      } catch (e: any) {
        toast.error(e?.message ?? "Failed to update");
      }
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 md:grid-cols-2 gap-4"
    >
      <input type="hidden" {...register("id")} />

      <div>
        <label className="block mb-1">First name</label>
        <input
          {...register("firstname")}
          className="w-full border rounded p-2"
        />
        {errors.firstname && (
          <span className="text-red-500">{errors.firstname.message}</span>
        )}
      </div>

      <div>
        <label className="block mb-1">Last name</label>
        <input
          {...register("lastname")}
          className="w-full border rounded p-2"
        />
        {errors.lastname && (
          <span className="text-red-500">{errors.lastname.message}</span>
        )}
      </div>

      <div>
        <label className="block mb-1">Class</label>
        <select
          {...register("classId", {
            setValueAs: (v) => (v === "" ? undefined : Number(v)),
          })}
          className="w-full border rounded p-2"
        >
          <option value="">— No class —</option>
          {classes.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block mb-1">Teacher</label>
        <select
          {...register("teacherId", {
            setValueAs: (v) => (v === "" ? undefined : Number(v)),
          })}
          className="w-full border rounded p-2"
        >
          <option value="">— No teacher —</option>
          {teachers.map((t) => (
            <option key={t.id} value={t.id}>
              {t.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block mb-1">Subject</label>
        <select
          {...register("subjectId", {
            setValueAs: (v) => (v === "" ? undefined : Number(v)),
          })}
          className="w-full border rounded p-2"
        >
          <option value="">— No class —</option>
          {subjects.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>
      </div>

      <div className="md:col-span-2 pt-2">
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex items-center rounded-md bg-black text-white px-4 py-2 disabled:opacity-60"
        >
          {isPending ? "Saving..." : "Update Student"}
        </button>
      </div>
    </form>
  );
}
