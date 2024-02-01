import express from "express";
import request from "supertest";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(cookieParser("SECRETKEY"));

app.get("/login", (req, res) => {
  const name = req.signedCookies["Login"];
  res.send(`Hello ${name}`);
});

test("Cookie Signed Test", async () => {
  let response = await request(app)
    .get("/login")
    .set("Cookie", "Login=s%3AWorld!.as9V8DCRDm6Xe3avPg4HtatQwYUKGyzJCvDavYuL25g; Path=/");
  expect(response.text).toBe("Hello World!");
});
