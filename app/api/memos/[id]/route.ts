import { emptyMemo } from "@/lib/memo";
import { authOptions } from "../../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

/**
 * @swagger
 * /api/memo/[id]:
 *   get:
 *     description: Get a memo
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
 *                 color:
 *                   type: string
 *                   example: "yellow"
 *                 checkBox:
 *                   type: boolean
 *                   example: false
 *                 updatedAt:
 *                   type: date
 *                   example: "2023-08-13T12:48:35.281Z"
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  console.log(session);

  if (isNaN(parseInt(params.id)))
    return NextResponse.json({ error: "Unvalid id" }, { status: 400 });

  const memo = await prisma.memo.findFirst({
    where: { id: parseInt(params.id), userId: session.user.id },
  });
  if (!memo || !Object.keys(memo))
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  return NextResponse.json(memo);
}

/**
 * @swagger
 * /api/memo/[id]:
 *   put:
 *     description: Update a memo
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 example: "12"
 *               title:
 *                 type: string
 *                 example: "To Do List"
 *               content:
 *                 type: string
 *                 example: "Wash the dishes\nTake a shower"
 *               color:
 *                 type: string
 *                 example: "yellow"
 *               checkBox:
 *                 type: string
 *                 example: "false"
 *               updatedAt:
 *                 type: string
 *                 example: "2023-08-13T12:48:35.281Z"
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
 *                 color:
 *                   type: string
 *                   example: "yellow"
 *                 checkBox:
 *                   type: boolean
 *                   example: false
 *                 updatedAt:
 *                   type: date
 *                   example: "2023-08-13T12:48:35.281Z"
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  if (isNaN(parseInt(params.id)))
    return NextResponse.json({ error: "Unvalid id" }, { status: 400 });

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

  if (isNaN(parseInt(params.id)))
    return NextResponse.json({ error: "Unvalid id" }, { status: 400 });

  try {
    const memo = await prisma.memo.update({
      where: { id: parseInt(params.id), userId: session.user.id },
      data: {
        title: data.title,
        content: data.content,
        color: data.color,
        checkBox: typeof data.checkBox == "boolean" ? data.checkBox : false,
        updatedAt: new Date(),
      },
    });
    if (!memo || !Object.keys(memo))
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    return NextResponse.json(memo);
  } catch {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
}

/**
 * @swagger
 * /api/memo/[id]:
 *   delete:
 *     description: Delete a memo
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
 *                 color:
 *                   type: string
 *                   example: "yellow"
 *                 checkBox:
 *                   type: boolean
 *                   example: false
 *                 updatedAt:
 *                   type: date
 *                   example: "2023-08-13T12:48:35.281Z"
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const memo = await prisma.memo.delete({
      where: { id: parseInt(params.id), userId: session.user.id },
    });
    return NextResponse.json(memo);
  } catch {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
}
