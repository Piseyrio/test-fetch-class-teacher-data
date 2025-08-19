import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const [classes, teachersRaw] = await Promise.all([
    prisma.class.findMany({
      select: { id: true, name: true },
      orderBy: { name: "asc" },
    }),
    prisma.teacher.findMany({
      select: { id: true, firstname: true, lastname: true },
      orderBy: [{ firstname: "asc" }, { lastname: "asc" }],
    }),
  ]);
  const teachers = teachersRaw.map((t) => ({
    id: t.id,
    name: `${t.firstname} ${t.lastname}`,
  }));
  return NextResponse.json({ classes, teachers });
}
