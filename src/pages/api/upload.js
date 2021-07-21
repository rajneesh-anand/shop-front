import { IncomingForm } from "formidable";
import { promises as fs } from "fs";
import prisma from "../../lib/prisma";
import { getSession } from "next-auth/client";
import DatauriParser from "datauri/parser";
const path = require("path");
export const config = {
  api: {
    bodyParser: false,
  },
};

const parser = new DatauriParser();

export default async function handler(req, res) {
  switch (req.method) {
    case "POST":
      const data = await new Promise((resolve, reject) => {
        const form = new IncomingForm();
        form.parse(req, (err, fields, files) => {
          if (err) return reject(err);
          resolve({ fields, files });
        });
      });

      const photo = await fs
        .readFile(data.files.image.path)
        .catch((err) => console.error("Failed to read file", err));

      let photo64 = parser.format(
        path.extname(data.files.image.name).toString(),
        photo
      );

      try {
        const session = await getSession({ req });
        const result = await prisma.post.create({
          data: {
            title: "title",
            category: "category",
            slug: "slug",
            image: photo64.content,
            author: { connect: { email: session?.user?.email } },
          },
        });

        res.status(200).json({
          msg: "success",
          result: result,
        });
      } catch (error) {
        res.status(500).send(error);
      } finally {
        async () => {
          await prisma.$disconnect();
        };
      }

      break;
    default:
      res.status(405).end();
      break;
  }
}
