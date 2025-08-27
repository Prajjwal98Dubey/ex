import express from "express";
import cors from "cors";
import fs from "fs";
import multer from "multer";
const app = express();
const upload = multer({ storage: multer.memoryStorage() });

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.urlencoded({ extended: true }));

app.post("/upload_file", upload.single("sample"), (req, res) => {
  const { fileName, index } = req.body;
  const filePath = process.cwd() + `/uploads/${fileName}`;
  fs.appendFileSync(filePath, req.file.buffer);
  console.log(`${index} chunk running`);

  res.send("file uploading !!!");
});

app.get("/chunk_data", async (req, res) => {
  const filePath = process.cwd() + "/demo.txt";
  const readableStream = fs.createReadStream(filePath, { encoding: "utf8" });
  res.setHeader("Content-type", "text/plain");
  readableStream.pipe(res);
  return;
});

app.get("/full_data", (req, res) => {
  return res.sendFile(process.cwd() + "/demo.txt");
});

app.listen("8081", () => console.log("server running at 8081"));
