import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const id = Number(params.id) || 0;
  const user = await prisma.user.findFirst({ where: { id } });
  if (!user)
    return NextResponse.json({ message: "User not found" }, { status: 500 });

  return NextResponse.json({ user });
};
