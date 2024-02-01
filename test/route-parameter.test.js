import express from "express";
import request from "supertest";

const app = express();

app.get("/products/:id", (req, res) => {
  const productId = req.params.id;
  if (productId) {
    res.send(`Product: ${productId}`);
  } else {
    res.status(404);
  }
});

app.get("/categories/:id(\\d+)", (req, res) => {
  const categoryId = req.params.id;
  if (categoryId) {
    res.send(`Category: ${categoryId}`);
  } else {
    res.status(404);
  }
});

test("Route Parameter Test", async () => {
  let response = await request(app).get("/products/detail");
  expect(response.text).toBe("Product: detail");

  response = await request(app).get("/products/about");
  expect(response.text).toBe("Product: about");

  response = await request(app).get("/products");
  expect(response.status).toBe(404);

  response = await request(app).get("/categories/12345");
  expect(response.text).toBe("Category: 12345");

  response = await request(app).get("/categories/list");
  expect(response.status).toBe(404);
});
