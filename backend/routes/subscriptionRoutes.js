import express from "express";
import { 
  createSubscription, 
  getSubscriptions, 
  deleteSubscription 
} from "../controllers/subscriptionController.js";

const router = express.Router();

router.post("/", createSubscription);  // POST /api/subscriptions
router.get("/", getSubscriptions);     // GET /api/subscriptions
router.delete("/:id", deleteSubscription); // DELETE /api/subscriptions/:id

export default router;
