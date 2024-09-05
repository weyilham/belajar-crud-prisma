import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
const prisma = new PrismaClient();

export const GET = async (req: NextRequest) => {
  const users = await prisma.user.findMany();
  return NextResponse.json({ users });
};

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  const user = await prisma.user.create({ data: body });
  return NextResponse.json({ user });
};

export const DELETE = async (req: NextRequest) => {
  const url = new URL(req.url).searchParams;
  const id = url.get("id");
  const user = await prisma.user.delete({ where: { id: Number(id) } });
  if (!user)
    return NextResponse.json({ message: "User not found" }, { status: 500 });
  return NextResponse.json({ user });
};

export const PUT = async (req: NextRequest) => {
  const body = await req.json();

  const user = await prisma.user.update({
    where: { id: body.id },
    data: body,
  });
  if (!user)
    return NextResponse.json({ message: "User not found" }, { status: 500 });
  return NextResponse.json({ user });
};
