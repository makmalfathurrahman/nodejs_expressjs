import express from "express";

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.status(200).json({ status: 200, method: "GET" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
