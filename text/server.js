import express from "express";
import cors from "cors";
import fs from "fs";
import multer from "multer";
const app = express();
const upload = multer({ storage: multer.memoryStorage() });
import path, { dirname } from "path";
import { fileURLToPath } from "url";

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.urlencoded({ extended: true }));

const __fileName = fileURLToPath(import.meta.url);
const __dirname = dirname(__fileName);
app.post("/upload_file", upload.single("sample"), (req, res) => {
  const { fileName, index } = req.body;

  const filePath = path.join(__dirname, "uploads", fileName);
  fs.appendFileSync(filePath, req.file.buffer);
  console.log(`${index} chunk running`);

  res.send("file uploading !!!");
});

app.get("/chunk_data", async (req, res) => {
  const filePath = path.join(__dirname + "/demo.txt");
  const readableStream = fs.createReadStream(filePath, { encoding: "utf8" });
  res.setHeader("Content-type", "text/plain");
  readableStream.pipe(res);
  return;
});

app.get("/full_data", (req, res) => {
  return res.sendFile(path.join(__dirname + "demo.txt"));
});

app.listen("8081", () => console.log("server running at 8081"));
