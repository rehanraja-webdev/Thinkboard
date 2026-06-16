import express from "express";
//const express = require("express")
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "../config/db.js";
import dotenv from "dotenv";
dotenv.config();

//LrOd8yX4dTt5cqN6
const app = express();
const PORT = process.env.PORT || 5001;
connectDB();

//middleware
app.use(express.json());

app.use("/api/notes", notesRoutes);

//GET: Get some data
//POST: Create a Post
//PUT: Update a post
//DELETE: Delete a post

app.listen(PORT, () => {
  console.log("server is running at port:", PORT);
});
