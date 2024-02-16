import cors from "cors";
import express from "express";
import rateLimit from "express-rate-limit";

const app = express();
const port = 8080;

const limiter = rateLimit({
  windowMs: 1000,
  max: 50,
  message: "Too Many Requests",
});

const delay = (timeout: number) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

app.use(
  cors({
    origin: "*",
  }),
);

app.use("/api", limiter);

app.post("/api", express.json(), async (req, res) => {
  const data = await req.body;
  const delayLength = Math.random() * 1000;
  await delay(delayLength);

  res.send({ index: data.index });
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
