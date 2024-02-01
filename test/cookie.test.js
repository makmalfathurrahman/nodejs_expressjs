import express from "express";
import request from "supertest";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  const name = req.cookies["name"];
  res.send(`Hello ${name}`);
});

app.post("/login", (req, res) => {
  const name = req.body.name;
  res.cookie("Login", name, { path: "/" });
  res.send(`Hello ${name}`);
});

test("Cookie Test", async () => {
  let response = await request(app).get("/").set("Cookie", "method=GET;name=World!;status=200");
  expect(response.text).toBe("Hello World!");
});

test("Cookie Body Test", async () => {
  let response = await request(app).post("/login").send({ name: "World!" });
  expect(response.get("Set-Cookie").toString()).toBe("Login=World!; Path=/");
  expect(response.text).toBe("Hello World!");
});
