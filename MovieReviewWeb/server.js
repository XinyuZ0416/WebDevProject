import express from "express";
import cors from "cors";
import reviews from "./api/reviews.route.js";

// configure an Express app with CORS, JSON parsing, and routes related to movie reviews

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/v1/reviews', reviews); //mount the reviews router at the path /api/v1/reviews (All routes defined in the reviews router will be prefixed with /api/v1/reviews)
app.use('*',(req, res)=> res.status(400).json({error:"not found"})); //add a catch-all routing, catch request that hasn't been handled by previous routes

export default app;