import express from "express";
import request from "supertest";

const app = express();

app
  .route("/products")
  .post((req, res) => {
    res.send("Create Products");
  })
  .get((req, res) => {
    res.send("Read Products");
  })
  .put((req, res) => {
    res.send("Update Products");
  });

test("Route Function Test", async () => {
  let response = await request(app).post("/products");
  expect(response.text).toBe("Create Products");

  response = await request(app).get("/products");
  expect(response.text).toBe("Read Products");

  response = await request(app).put("/products");
  expect(response.text).toBe("Update Products");
});
