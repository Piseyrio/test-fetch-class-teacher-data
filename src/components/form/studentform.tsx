// src/components/students/StudentForm.tsx
"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { StudentSchema, studentSchema } from "@/lib/zod";
import { createStudent } from "@/lib/actions";
import { toast } from "sonner";

type Option = { id: number; name: string };

export function StudentForm({
  classes,
  teachers,
}: {
  classes: Option[];
  teachers: Option[];
}) {
  const [isPending, startTransition] = useTransition();

  const { register, handleSubmit, formState: { errors }, reset } = useForm<StudentSchema>({
    resolver: zodResolver(studentSchema),
    defaultValues: {
     
    },
  });

  const onSubmit = (values: StudentSchema) => {
    startTransition(async () => {
      try {
        await createStudent(values); // redirect happens in the action
        // If you remove redirect in action, you can toast here then navigate manually.
        reset();
      } catch (e: any) {
        toast.error(e?.message ?? "Failed to create student");
      }
    });
  };

  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block mb-1">First name</label>
        <input {...register("firstname")} className="w-full border rounded p-2" />
        {errors.firstname && <span className="text-red-500">{errors.firstname.message}</span>}
      </div>

      <div>
        <label className="block mb-1">Last name</label>
        <input {...register("lastname")} className="w-full border rounded p-2" />
        {errors.lastname && <span className="text-red-500">{errors.lastname.message}</span>}
      </div>

      

      <div>
        <label className="block mb-1">Class</label>
        <select {...register("classId")} className="w-full border rounded p-2">
          <option value="">— No class —</option>
          {classes.map(c => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
        {errors.classId && <span className="text-red-500">{errors.classId.message}</span>}
      </div>

      <div>
        <label className="block mb-1">Teacher</label>
        <select {...register("teacherId")} className="w-full border rounded p-2">
          <option value="">— No teacher —</option>
          {teachers.map(t => (
            <option key={t.id} value={t.id}>{t.name}</option>
          ))}
        </select>
        {errors.teacherId && <span className="text-red-500">{errors.teacherId.message}</span>}
      </div>

      <div className="md:col-span-2 pt-2">
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex items-center rounded-md bg-black text-white px-4 py-2 disabled:opacity-60"
        >
          {isPending ? "Saving..." : "Create Student"}
        </button>
      </div>
    </form>
  );
}
