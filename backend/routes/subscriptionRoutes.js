import express from "express";
import { createSubscription, getSubscriptions } from "../controllers/subscriptionController.js";

const router = express.Router();

router.post("/", createSubscription);  // POST /api/subscriptions
router.get("/", getSubscriptions);     // GET /api/subscriptions



export default router;
