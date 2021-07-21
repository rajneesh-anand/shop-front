import prisma from "../../../lib/prisma";
import { getSession } from "next-auth/client";

export default async function handler(req, res) {
  const { title, category, content, slug } = req.body;
  console.log(req.body);

  switch (req.method) {
    case "GET":
      //...
      break;
    case "POST":
      try {
        const session = await getSession({ req });
        const result = await prisma.post.create({
          data: {
            title: title,
            category: category,
            slug: slug,
            content: content,
            published: true,
            tags: ["NEWS", "SPORTS", "TRAVEL"],
            author: { connect: { email: session?.user?.email } },
          },
        });

        console.log(result);
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
