import express from "express";
import cors from "cors";
import fs from "fs";
const app = express();

app.use(
  cors({
    origin: "*",
  })
);

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
