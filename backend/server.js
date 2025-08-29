import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import { connectDB } from "./config/db.js";
import userRouter from "./routes/userRoute.js";
import menuRoutes from "./routes/menuRoutes.js";
import reviewRouter from "./routes/reviewRouter.js";
import reservationRouter from "./routes/reservationRoute.js";
import foodTruckRouter from "./routes/foodTruckReservationRoute.js";
import paymentRouter from "./routes/paymentRoute.js"; 
import { handleStripeWebhook } from "./controllers/webhookController.js";
import passport from "./config/passport.js";
import session from "express-session";
import subscriptionRouter from "./routes/subscriptionRoutes.js";
import orderRoutes from "./routes/orderRoute.js";

// App config
const app = express();
const port = process.env.PORT || 4000;

// CORS configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200
};

// Apply express.json() and other middleware AFTER the webhook handler
app.use(cors(corsOptions));

// Webhook endpoint must come before any other body parsers
app.post(
  "/webhooks/stripe",
  // Raw body parser for webhooks
  express.raw({ type: 'application/json' }),
  handleStripeWebhook
);

// Regular body parsers for other routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// Database connection
connectDB();

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// API Routes
app.use("/api/user", userRouter);
app.use("/api/menu", menuRoutes);
app.use("/api/reviews", reviewRouter);
app.use("/api/reservations", reservationRouter);
app.use("/api/foodtruck-reservations", foodTruckRouter);
app.use("/api/payments", paymentRouter);
app.use("/api/subscriptions", subscriptionRouter);
app.use("/api/orders", orderRoutes);

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok", message: "API is running" });
});

// Root endpoint
app.get("/", (req, res) => {
  res.json({ message: "Belmio Pizza API" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
