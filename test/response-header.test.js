import express from "express";
import request from "supertest";

const app = express();

app.get("/", (req, res) => {
  res
    .set({
      "Powered-By": "Acer",
      "Code-Editor": "Visual Studio Code",
    })
    .end();
});

test("Request Header Test", async () => {
  const response = await request(app).get("/");

  expect(response.get("Powered-By")).toBe("Acer");
  expect(response.get("Code-Editor")).toBe("Visual Studio Code");
});
