import express from "express";
import cors from "cors";
import "dotenv/config";
import bodyParser from "body-parser";
import routes from "./routes/index.js";

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
  res.json("hello");
});

app.use("/api", routes);

app.listen(process.env.PORT, async () => {
  console.log("listen on port ", process.env.PORT);
});
