import express from "express";
import request from "supertest";

const logger = (req, res, next) => {
  console.log(`Receive: ${req.method} ${req.originalUrl}`);
  next();
};

const addPoweredHeader = (req, res, next) => {
  res.set("Powered-By", "Acer");
  next();
};

const apiKeyMiddleware = (req, res, next) => {
  if (req.query.apiKey) {
    next();
  } else {
    res.status(401).end();
  }
};

const timeMiddleware = (req, res, next) => {
  req.requestTime = Date.now();
  next();
};

const app = express();

app.use(logger);
app.use(apiKeyMiddleware);
app.use(addPoweredHeader);
app.use(timeMiddleware);

app.get("/", (req, res) => {
  res.send(`Hello World!`);
});

app.get("/time", (req, res) => {
  res.send(`Time: ${req.requestTime}`);
});

test("Middleware Test", async () => {
  const response = await request(app).get("/").query({ apiKey: "12345" });
  expect(response.get("Powered-By")).toBe("Acer");
  expect(response.text).toBe("Hello World!");
});

test("Unauthorized Middleware Test", async () => {
  const response = await request(app).get("/");
  expect(response.status).toBe(401);
});

test("Time Middleware Test", async () => {
  const response = await request(app).get("/time").query({ apiKey: "12345" });
  expect(response.get("Powered-By")).toBe("Acer");
  expect(response.text).toContain(`Time: `);
});
