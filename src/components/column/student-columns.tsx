"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Link from "next/link";
import { Student } from "@/generated/prisma/client";

function fmtDate(d: Date | string | null) {
  if (!d) return "—";
  const date = d instanceof Date ? d : new Date(d);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "2-digit" });
}

function titleCase(s: string | null | undefined){
  if (!s) return "-";
  return s.charAt(0) + s.slice(1).toLowerCase();
}

// For fetch Data form prisma check database name , for FakeData check FakeData.ts at lib
export const columns: ColumnDef<Student>[] = [
  { accessorKey: "code", header: "Code" },
  {
    accessorKey: "id",
    header: "ID",
    meta: { className: "hidden md:table-cell" },
  },
  {
    id: "firstname",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Name
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    accessorFn: (row) => `${row.firstname} ${row.lastname}`, // needed for sorting
    filterFn: (row, columnId, filterValue) => {
      const fullName = row.getValue(columnId) as string;
      return fullName.toLowerCase().includes(filterValue.toLowerCase());
    },
    cell: ({ row }) => {
      const firstname = row.original.firstname;
      const lastname = row.original.lastname;
      return (
        <Link href={`/dashboard/list/students/${row.original.id}`}>
          <div className="flex flex-col leading-tight">
            <span className="font-medium">{firstname}</span>
            <span className="text-gray-500 text-sm">{lastname}</span>
          </div>
        </Link>
      );
    },
  },
  {
    id: "teacher",
    header: "Teacher",
    accessorFn: (row) => (row.teacherId ? `Teacher ${row.teacherId}` : "_"),
  },
  {
    id: "class",
    header: "Class",
    accessorFn: (row) => (row.classId ? `Class ${`${row.classId}`}` : "—"),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel className="text-red-500">
              Actions
            </DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(String(payment.id))}
            >
              Copy payment ID
            </DropdownMenuItem>

            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-green-500">Edit</DropdownMenuItem>
            <DropdownMenuItem>Details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
