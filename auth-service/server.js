import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import users from "./routes/User.js";
import { API, USER } from "./util/AuthConstants.js";
import cors from "cors";

dotenv.config();
const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// const db = require('./conn/keys').mongoURI;
// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Passport middleware
// app.use(passport.initialize());

// Use Routes
app.use(API + USER, users);

app.get("/", (req, res) => {
  res.status(200).json({ message: "hello node" });
});

const PORT = process.env.SERVER_PORT || 9001;
app.listen(PORT, console.log(`Server started at port ${PORT}`));
