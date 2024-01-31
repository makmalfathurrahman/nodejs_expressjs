import express from "express";
import request from "supertest";

const app = express();

app.get("/", (req, res) => {
  res.redirect(302, "/about");
});

test("Request Header Test", async () => {
  const response = await request(app).get("/");

  expect(response.status).toBe(302);
  expect(response.get("Location")).toBe("/about");
});
