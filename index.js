const express = require("express");
const connect = require("./config/db");
const userRouter = require("./routes/user.route");
const productRouter = require("./routes/blog.route");
const cors = require("cors");  // ✅ Import CORS

require("dotenv").config();

const app = express();

// ✅ Enable CORS for frontend
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",  // Allow frontend
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true  // Allow cookies if needed
}));

// Body parser middleware
app.use(express.json());

// Routes
app.use("/users", userRouter);
app.use("/products", productRouter);

// Health check route
app.get("/health", (req, res) => {
  res.send("OK!");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err.message);
  res.status(500).send({ message: err.message });
});

// Start the server
const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  await connect();
  console.log("Listening to server on port " + PORT);
});
