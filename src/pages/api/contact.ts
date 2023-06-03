import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const { name, email, message } = req.body;

  const formData = await prisma.formData.create({
    data: {
      name,
      email,
      message,
    },
  });

  res.json(formData);
}
