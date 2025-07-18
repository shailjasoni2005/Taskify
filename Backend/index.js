import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import todoRoute from "../Backend/routes/todo.route.js"
import userRoute from "../Backend/routes/user.route.js"
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express()

dotenv.config();

const PORT = process.env.PORT || 4001;
const DB_URI = process.env.MONGODB_URI;

// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders:["Content-Type", "Authorization"]
}))

// Database connection code
try {
  await mongoose.connect(DB_URI);
  console.log("Connected to MongoDB");
} catch (error) {
  console.log(error);
}

// routes
app.use("/todo", todoRoute); 
app.use("/user", userRoute); 

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
});
