import prisma from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { id: number } }
) {
  console.log(params.id);
  const memo = prisma.memo.findFirst({ where: { id: params.id } });
  return new Response(JSON.stringify(memo));
}
