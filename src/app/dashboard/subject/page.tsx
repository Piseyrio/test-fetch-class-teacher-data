import { columns } from "@/components/column/class-columns";
import { DataTableSubject } from "@/components/data-table/data-table-subject";
import { prisma } from "@/lib/prisma";

// Ensure this is a server component by not using 'use client'
export default async function SubjectPage() {
  const subjects = await prisma.subject.findMany();

  return (
    <div className="">
      <DataTableSubject columns={columns} data={subjects} />
    </div>
  );
}

