import express from "express";
import request from "supertest";

const app = express();

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/example.txt");
});

test("Response Body Test", async () => {
  const response = await request(app).get("/");

  expect(response.text).toContain("This is sample text");
});
