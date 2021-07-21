import formidable from "formidable";
const fs = require("fs");

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  return new Promise(async (resolve, reject) => {
    const form = new formidable.IncomingForm({
      multiples: true,
      keepExtensions: true,
    });

    form
      .on("file", (name, file) => {
        const data = fs.readFileSync(file.path);
        fs.writeFileSync(`public/upload/${file.name}`, data);
        fs.unlinkSync(file.path);
      })
      .on("aborted", () => {
        reject(res.status(500).send("Aborted"));
      })
      .on("end", () => {
        resolve(res.status(200).json({ message: "uploaded" }));
      });

    await form.parse(req);
  });
}
