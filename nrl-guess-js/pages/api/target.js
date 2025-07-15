
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req, res) {
  const player = await prisma.player.findFirst({
    where: { is_active: true },
    orderBy: { id: 'asc' }
  });
  res.json(player);
}
