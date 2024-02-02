import express from "express";
import request from "supertest";
import mustacheExpress from "mustache-express";

const app = express();

app.set("views", __dirname + "/views");
app.set("view engine", "html");
app.engine("html", mustacheExpress());

app.get("/", (req, res) => {
  res.render("index", {
    title: "Template Engine",
    content: "Hello from Template Engine",
  });
});

test("Template Engine Test", async () => {
  const response = await request(app).get("/");
  expect(response.text).toContain("Template Engine");
  expect(response.text).toContain("Hello from Template Engine");
});
