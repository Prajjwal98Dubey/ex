import express from "express";
import cors from "cors";
import multer from "multer";
import fs from "fs";
const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.urlencoded({ extended: true }));

const upload = multer({ storage: multer.memoryStorage() });

app.post("/upload", upload.single("test"), (req, res) => {
  const { fileName, index } = req.body;
  const filePath = process.cwd() + `/audio-uploads/${fileName}`;
  fs.appendFileSync(filePath, req.file.buffer);
  console.log(`${index}th chunk uploaded..`);
  return res.send("file uploading");
});

app.listen(8082, () => console.log("audio server running at 8082"));
