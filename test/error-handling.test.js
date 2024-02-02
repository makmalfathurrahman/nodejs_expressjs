import express from "express";
import request from "supertest";

const app = express();

const errorMiddleware = (err, req, res, next) => {
  res.status(500).send(`ERROR: ${err.message}`);
};

app.get("/", (req, res) => {
  const name = req.query.name;
  if (name) {
    res.send(`Hello ${name}`);
  } else {
    throw new Error("Ups!");
  }
});

app.use(errorMiddleware);

test("Error Handling Test", async () => {
  const response = await request(app).get("/").query({ name: "World!" });
  expect(response.text).toBe("Hello World!");
});

test("Error Handling Test", async () => {
  const response = await request(app).get("/");
  expect(response.status).toBe(500);
  expect(response.text).toBe("ERROR: Ups!");
});
