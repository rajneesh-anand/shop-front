import prisma from "../../../lib/prisma";

export default async function handler(req, res) {
  const curPage = req.query.page || 1;
  const perPage = 10;

  try {
    const movie = await prisma.movie.findMany({
      take: perPage * curPage,
      where: {
        status: true,
      },
      include: {
        author: {
          select: { name: true, image: true },
        },
      },
    });

    const totalMovies = movie.length;

    console.log(movie);

    res.status(200).json({
      msg: "success",
      data: movie,
      curPage: curPage,
      maxPage: Math.ceil(totalMovies / perPage),
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
