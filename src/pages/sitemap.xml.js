import prisma from "../lib/prisma";

const Sitemap = () => {};

export const getServerSideProps = async ({ res }) => {
  const blogs = await prisma.post.findMany({
    where: {
      published: true,
    },
    select: {
      id: true,
      slug: true,
    },
  });

  const movies = await prisma.movie.findMany({
    where: {
      status: true,
    },
    select: {
      slug: true,
    },
  });

  const baseUrl = {
    development: "http://localhost:3000",
    production: "https://kokeliko.vercel.app",
  }[process.env.NODE_ENV];

  const staticPages = [
    "https://kokeliko.vercel.app/about",
    "https://kokeliko.vercel.app/contact",
    "https://kokeliko.vercel.app/articles/spirituality",
    "https://kokeliko.vercel.app/articles/yoga",
    "https://kokeliko.vercel.app/articles/meditation",
    "https://kokeliko.vercel.app/articles/travel",
    "https://kokeliko.vercel.app/shop",
    "https://kokeliko.vercel.app/photos",
    "https://kokeliko.vercel.app/privacypolicy",
    "https://kokeliko.vercel.app/termsofuse",
    "https://kokeliko.vercel.app/user/newpost",
    "https://kokeliko.vercel.app/user/account",
    "https://kokeliko.vercel.app/user/product",
    "https://kokeliko.vercel.app/user/upload/video",
    "https://kokeliko.vercel.app/auth/signin",
    "https://kokeliko.vercel.app/movie",
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
   
      ${staticPages
        .map((url) => {
          return `
            <url>
              <loc>${url}</loc>
              <lastmod>${new Date().toISOString()}</lastmod>
              <changefreq>weekly</changefreq>
              <priority>1.0</priority>
            </url>
          `;
        })
        .join("")}


          ${blogs
            .map((blog) => {
              return `
              <url>
                <loc>${baseUrl}/read/${blog.id}/${blog.slug}</loc>
                <lastmod>${new Date().toISOString()}</lastmod>
                <changefreq>weekly</changefreq>
                <priority>1.0</priority>
              </url>
            `;
            })
            .join("")}

              ${movies
                .map((movie) => {
                  return `
              <url>
                <loc>${baseUrl}/movie/${movie.slug}</loc>
                <lastmod>${new Date().toISOString()}</lastmod>
                <changefreq>weekly</changefreq>
                <priority>1.0</priority>
              </url>
            `;
                })
                .join("")}
    </urlset>
  `;

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default Sitemap;
