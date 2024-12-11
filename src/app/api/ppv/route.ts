import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/db";

type ResponseData = {
  message: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {
  res.status(200).json({ message: "Hello from Next.js!" });
}
