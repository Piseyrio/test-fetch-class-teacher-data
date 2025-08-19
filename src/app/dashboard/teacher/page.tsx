import { columns } from "@/components/column/class-columns";
import { DataTableTeacher } from "@/components/data-table/data-table-teacher";

import { prisma } from "@/lib/prisma";

export default async function TeacherPage() {
  const teacher = await prisma.teacher.findMany();

  // Map teacher data to include 'name' property
  const teacherWithName = teacher.map(t => ({
    ...t,
    name: `${t.firstname} ${t.lastname}`,
  }));

  return (
    <div className="">
      <DataTableTeacher columns={columns} data={teacherWithName} />
    </div>
  );
}

