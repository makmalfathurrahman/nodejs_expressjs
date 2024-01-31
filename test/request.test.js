import express from "express";
import request from "supertest";

const app = express();

app.get("/", (req, res) => {
  res.status(200).json({ status: 200, method: "GET" });
});

test("Request GET Method Test", async () => {
  const response = await request(app).get("/");
  expect(response.body).toEqual({ status: 200, method: "GET" });
});
