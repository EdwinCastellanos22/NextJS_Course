// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Prisma, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import NextCors from "nextjs-cors";
import upload from "@/components/muterStorage";

export const uploadFile = (req) => {
  return new Promise((resolve, reject) => {
    upload(req, null, (err) => {
      if (err) {
        reject(err);
      } else {
        const { filename } = req.file;
        resolve(filename);
      }
    });
  });
};

export default async function handler(req, res) {
  const method = req.method;

  await NextCors(req, res, {
    methods: ["GET", "POST", "PUT", "DELETE"],
    origin: "*",
    optionsSuccessStatus: 200,
  });

  if (method == "GET") {
    try {
      const books = await prisma.book.findMany({
        include: {
          author: true,
        },
      });
      res.status(200).json(books);
    } catch (error) {
      res.status(500).json({ Message: "Error al obtener los libros" });
    } finally {
      await prisma.$disconnect();
    }
  } else if (method == "POST") {
    await uploadFile(req)
    const { title, description, price, stock, author } = req.body;
    const { filename } = req.file;
    try {
      const bookCreated = await prisma.book.create({
        data: {
          imagePath: "/uploads/" + filename,
          title: title,
          description: description,
          price: parseFloat(price),
          stock: parseInt(stock),
          authorId: parseInt(author),
        },
      });
      res.status(200).json({ "Book Created": bookCreated });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        res.status(500).json({ "Error Prisma": error.message });
      } else if (error instanceof Prisma.PrismaClientValidationError) {
        res.status(500).json({ "Error Prisma": error.message });
      } else {
        res.status(500).json({ "Error Inesperado": error });
      }
    } finally {
      await prisma.$disconnect();
    }
  } else {
    res.status(404).json({
      Message: "Method not found",
    });
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
