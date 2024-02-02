import express from "express";
import request from "supertest";

const app = express();

app.get("/", (req, res) => {
  res.status(200).json({ status: 200, method: "GET" });
});

app.use((req, res, next) => {
  res.status(404).send("ERROR 404: Not found!");
});

test("Error Not Found Test", async () => {
  const response = await request(app).get("/");
  console.info(response.body);
  expect(response.body).toEqual({ status: 200, method: "GET" });
});

test("Error Not Found Test", async () => {
  const response = await request(app).get("/error");
  expect(response.status).toBe(404);
  expect(response.text).toBe("ERROR 404: Not found!");
});
