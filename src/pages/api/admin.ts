import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const { password } = req.body;

  if (password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).end();
  }

  const formDatas = await prisma.formData.findMany();

  const formDatasSerializable = formDatas.map((formData) => ({
    ...formData,
    createdAt: formData.createdAt.toISOString(),
  }));

  res.status(200).json(formDatasSerializable);
}
