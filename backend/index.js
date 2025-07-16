import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import formRoutes from "./routes/formRoute.js";

dotenv.config();

const app = express();
const port = 3000;

// Middleware
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"]
}));
app.use(express.json());

// Routes
app.use("/api/details", formRoutes);

// Connect DB and Start Server
connectDB();
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
