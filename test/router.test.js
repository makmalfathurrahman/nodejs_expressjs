import express from "express";
import request from "supertest";

const app = express();

const router = express.Router();

router.use((req, res, next) => {
  console.info(`Receive: ${req.originalUrl}`);
  next();
});

router.get("/product/a1", (req, res) => {
  res.send("Product A1");
});

test("Router Test Disabled", async () => {
  const response = await request(app).get("/product/a1");
  expect(response.status).toBe(404);
});

test("Router Test Enabled", async () => {
  app.use(router);

  const response = await request(app).get("/product/a1");
  expect(response.text).toBe("Product A1");
});
