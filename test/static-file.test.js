import express from "express";
import request from "supertest";

const app = express();

app.get("/", (req, res) => {
  res.send(`Hello World!`);
});

app.use(express.static(__dirname + "/static"));
test("Static File Test", async () => {
  let response = await request(app).get("/");
  expect(response.text).toBe("Hello World!");

  response = await request(app).get("/example.txt");
  expect(response.text).toContain("Hello from Static");
});

app.use("/static", express.static(__dirname + "/static"));
test("Static File Prefix Test", async () => {
  let response = await request(app).get("/");
  expect(response.text).toBe("Hello World!");

  response = await request(app).get("/static/example.txt");
  expect(response.text).toContain("Hello from Static");
});
