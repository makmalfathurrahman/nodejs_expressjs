import express from "express";
import request from "supertest";

const app = express();

app.get("/hello", (req, res) => {
  res.send(`Hello World!`);
});

test("Request Header Test", async () => {
  const response = await request(app).get("/hello");
  expect(response.text).toBe("Hello World!");
});
