import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/users.js";
const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use(cors());
app.use("/posts", postRoutes);
app.use("/user", userRoutes);
const PORT = 5000 || process.env.PORT;
const CONNECTION_URL = process.env.CONNECTION_URL;
app.get("/", (req, res) => {
  res.send("APP IS RUNNING.");
});
mongoose.set("strictQuery", false);
mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () => {
      console.log("connected with database successfully.");
      console.log(`App is running on http://localhost:${PORT}`);
    })
  )
  .catch((error) => {
    console.log(error);
  });
