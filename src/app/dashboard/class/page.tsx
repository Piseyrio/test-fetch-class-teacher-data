import { columns } from "@/components/column/class-columns";
import { DataTableClass } from "@/components/data-table/data-table-class";
import { prisma } from "@/lib/prisma";

// Ensure this is a server component by not using 'use client'
export default async function ClassPage() {
  const classes = await prisma.class.findMany();

  return (
    <div className="">
      <DataTableClass columns={columns} data={classes} />
    </div>
  );
}

