import express from "express";
import request from "supertest";
import fileUpload from "express-fileupload";

const app = express();

app.use(fileUpload());

app.post("/file", async (req, res) => {
  const textFile = req.files.article;
  await textFile.mv(__dirname + "/upload/" + textFile.name);

  res.send(`Hello ${req.body.name}. You uploaded ${textFile.name}`);
});

test("File Upload Test", async () => {
  const response = await request(app)
    .post("/file")
    .set("Content-Type", "multipart/form-data")
    .field("name", "World")
    .attach("article", __dirname + "/example.txt");

  expect(response.text).toBe("Hello World. You uploaded example.txt");
});
