import prisma from "prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const collection = await prisma.collection.findMany();
  return NextResponse.json(collection);
}
