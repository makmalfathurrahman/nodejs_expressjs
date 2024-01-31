import express from "express";
import request from "supertest";

const app = express();

app.get("/", (req, res) => {
  if (req.query.name) {
    res.status(200).send(`Hello ${req.query.name}`);
  } else {
    res.status(400).end();
  }
});

test("Request Header Test", async () => {
  const response200 = await request(app).get("/").query({ name: "World!" });
  expect(response200.status).toBe(200);
  expect(response200.text).toBe("Hello World!");

  const response400 = await request(app).get("/");
  expect(response400.status).toBe(400);
});
