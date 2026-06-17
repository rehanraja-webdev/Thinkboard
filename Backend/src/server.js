import express from "express";
//const express = require("express")
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

//middleware
app.use(express.json()); //this middleware will parse JSON bodies: req.body
app.use(rateLimiter);

app.use("/api/notes", notesRoutes);

//GET: Get some data
//POST: Create a Post
//PUT: Update a post
//DELETE: Delete a post

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("server is running at port:", PORT);
  });
});
