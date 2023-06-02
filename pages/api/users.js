import { Prisma, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req, res) {
  const method = req.method;

  if (method == "GET") {
    try {
      const books = await prisma.user.findMany();
      res.status(200).json(books);
    } catch (error) {
      res.status(500).json(error);
    } finally {
      await prisma.$disconnect();
    }
  }
}
