import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.get("/", (req, res) => {
  res.status(200).json({ message: "hello node" });
});

const PORT = process.env.SERVER_PORT || 9211;
app.listen(PORT, console.log(`Server started at port ${PORT}`));
