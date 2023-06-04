import { PrismaClient } from "@prisma/client";
import { type NextApiRequest, type NextApiResponse } from "next";

const prisma = new PrismaClient();

type RequestBody = {
  name: string;
  email: string;
  message: string;
};

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const { name, email, message } = req.body as RequestBody;

  const formData = await prisma.formData.create({
    data: {
      name,
      email,
      message,
    },
  });

  res.json(formData);
}
