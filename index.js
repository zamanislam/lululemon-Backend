const express = require("express");
const connect = require("./config/db");
const userRouter = require("./routes/user.route");
const productRouter = require("./routes/blog.route");
const app = express();
// const cors = require("cors");

require("dotenv").config();

// app.use(cors({
//   origin:process.env.FRONTEND_URL
// }))


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
