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
import { Subject} from "@/generated/prisma/client";

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
export const columns: ColumnDef<Subject>[] = [

  {
    accessorKey: "id",
    header: "ID",
    meta: { className: "hidden md:table-cell" },
  },
{
  accessorKey: "name",
  header: "Name",
  
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
