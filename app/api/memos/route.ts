import { emptyMemo } from "@/lib/memo";
import { authOptions } from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

/**
 * @swagger
 * /api/memos:
 *   get:
 *     description: Returns all memos
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 12
 *                 userId:
 *                   type: string
 *                   example: "abcdefghijklmno1234567890"
 *                 title:
 *                   type: string
 *                   example: "To Do List"
 *                 content:
 *                   type: string
 *                   example: "Wash the dishes\nTake a shower"
 */
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  return NextResponse.json(
    await prisma.memo.findMany({
      where: { userId: session.user.id },
      orderBy: { id: "desc" },
    })
  );
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const data = await request.json();
  const dataKeys = Object.keys(data);
  const noKeys = Object.keys(emptyMemo)
    .filter((key) => !["id", "userId", "updatedAt"].includes(key)) // No need to add a new memo to db
    .filter((key) => !dataKeys.includes(key)); // Check if client give us all data
  if (noKeys.length > 0)
    return NextResponse.json(
      { error: `Require fields [${noKeys.join()}]` },
      { status: 400 }
    );

  const memo = await prisma.memo.create({
    data: {
      userId: session.user.id,
      title: data.title,
      content: data.content,
      color: data.color,
      checkBox: typeof data.checkBox == "boolean" ? data.checkBox : false,
      updatedAt: new Date(),
    },
  });

  return NextResponse.json(memo);
}
