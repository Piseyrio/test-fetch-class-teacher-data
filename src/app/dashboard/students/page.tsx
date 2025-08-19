import { columns } from "@/components/column/student-columns";
import { DataTableStudents } from "@/components/data-table/data-table-student";
import { prisma } from "@/lib/prisma";


export default async function StudentPage() {
  const student = await prisma.student.findMany({
    include: {
      class: { select: { id: true, name: true } },
      teacher: { select: { id: true, firstname: true, lastname: true } },
    },

    orderBy: [{ lastname: "asc" }, { firstname: "asc" }],
  });

  return (
    <div className="">
      <DataTableStudents columns={columns} data={student}/>
    </div>
  );
}

