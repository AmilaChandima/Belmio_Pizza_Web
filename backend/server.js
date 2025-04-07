import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js"; // Assuming this connects to MongoDB
import userRouter from "./routes/userRoute.js";
import reviewRouter from "./routes/reviewRouter.js"; // Ensure this file exists
import "dotenv/config"; // Load environment variables from .env

// App config
const app = express();
const port = process.env.PORT || 4000; // Use env variable or default to 4000

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(cors()); // Enable CORS for frontend requests

// DB connection
connectDB(); // Connect to MongoDB

// Routes
app.use("/api/user", userRouter); // User routes
app.use("/api/reviews", reviewRouter); // Review routes (fixed typo)

// Root route
app.get("/", (req, res) => {
  res.send("API Working");
});

// Start server
app.listen(port, () => {
  console.log(`Server Started on http://localhost:${port}`);
});