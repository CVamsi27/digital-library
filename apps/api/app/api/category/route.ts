import prisma from "prisma";
import { NextResponse } from "next/server";
import { categorySchema } from "zod-schemas";

export async function GET() {
  const category = await prisma.category.findMany();
  const validation = categorySchema.safeParse(category);

  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }
  return NextResponse.json(category, { status: 200 });
}

export async function POST() {
  const category = await prisma.category.createMany({
    data: [
      {
        name: "Mystery",
        color: "bg-blue-500/40",
      },
      {
        name: "Poetry",
        color: "bg-lime-500/40",
      },
      {
        name: "Fiction",
        color: "bg-sky-500/40",
      },
      {
        name: "Biography",
        color: "bg-teal-500/40",
      },
      {
        name: "Romance",
        color: "bg-yellow-500/40",
      },
      {
        name: "Adventure",
        color: "bg-rose-500/40",
      },
      {
        name: "Historical",
        color: "bg-indigo-500/40",
      },
      {
        name: "Thriller",
        color: "bg-fuchsia-500/40",
      },
      {
        name: "Horror",
        color: "bg-green-500/40",
      },
      {
        name: "All",
        color: "bg-orange-500/40",
      },
    ],
    skipDuplicates: true,
  });
  return NextResponse.json(category);
}
