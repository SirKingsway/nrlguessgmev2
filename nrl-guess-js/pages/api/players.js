
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req, res) {
  const players = await prisma.player.findMany({
    select: { id: true, name: true }
  });
  res.json(players);
}
