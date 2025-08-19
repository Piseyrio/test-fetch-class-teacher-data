// src/components/students/StudentForm.tsx
"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ClassSchema, classSchema } from "@/lib/zod";
import { toast } from "sonner";
import { createClass } from "@/lib/actions";


export function ClassForm() {
  const [isPending, startTransition] = useTransition();

  const { register, handleSubmit, formState: { errors }, reset } = useForm<ClassSchema>({
    resolver: zodResolver(classSchema),
    defaultValues: {
     
    },
  });

  const onSubmit = (values: ClassSchema) => {
    startTransition(async () => {
      try {
        await createClass(values); // redirect happens in the action
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
        <label className="block mb-1">Name</label>
        <input {...register("name")} className="w-full border rounded p-2" />
        {errors.name && <span className="text-red-500">{errors.name.message}</span>}
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
