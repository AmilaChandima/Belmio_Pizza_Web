import express from "express";
import { newOrder, listOrders, markOrderPaid,getOrderById,updateOrderStatus } from "../controllers/orderController.js";

const router = express.Router();

router.post("/", newOrder);       // Create order
router.get("/", listOrders);      // Get all orders
router.patch("/:orderId/paid", markOrderPaid); // Mark order as paid
router.get("/:orderId", getOrderById);
router.patch("/:id/status", updateOrderStatus);

export default router;
