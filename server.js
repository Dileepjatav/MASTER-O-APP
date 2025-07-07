import express from "express";
import cors from "cors";
import "dotenv/config";
import bodyParser from "body-parser";

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", async (req, res) => {
  console.log("Ping");
  res.json("hello");
});

app.listen(process.env.PORT, async () => {
  console.log("listen on port ", process.env.PORT);
});
