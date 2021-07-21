import prisma from "../../../lib/prisma";

export default async function handler(req, res) {
  const curPage = req.query.page || 1;
  const perPage = 10;

  try {
    const blog = await prisma.post.findMany({
      take: perPage * curPage,
      where: {
        published: true,
      },
      include: {
        author: {
          select: { name: true, image: true },
        },
      },
    });

    const totalBlogs = blog.length;

    // console.log(blog);

    res.status(200).json({
      msg: "success",
      data: blog,
      curPage: curPage,
      maxPage: Math.ceil(totalBlogs / perPage),
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  } finally {
    async () => {
      await prisma.$disconnect();
    };
  }
}
