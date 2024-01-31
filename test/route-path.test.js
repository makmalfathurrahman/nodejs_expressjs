import express from "express";
import request from "supertest";

const app = express();

app.get("/products/*.json", (req, res) => {
  res.send(req.originalUrl);
});

app.get("/categories/*(\\d).json", (req, res) => {
  res.send(req.originalUrl);
});

test("Route Path Test", async () => {
  let response = await request(app).get("/products/detail.json");
  expect(response.text).toBe("/products/detail.json");

  response = await request(app).get("/products/about.json");
  expect(response.text).toBe("/products/about.json");

  response = await request(app).get("/categories/12345.json");
  expect(response.text).toBe("/categories/12345.json");

  response = await request(app).get("/categories/list.json");
  expect(response.status).toBe(404);
});
