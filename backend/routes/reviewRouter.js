import express from "express";
import { createReview, getReviews } from "../controllers/reviewController.js";

const reviewRouter = express.Router();

reviewRouter.post("/reviews", createReview);
reviewRouter.get("/reviews", getReviews);

export default reviewRouter;