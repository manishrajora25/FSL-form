// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import connectDB from "./config/db.js";
// import formRoutes from "./routes/formRoute.js";
// import "dotenv/config";
// dotenv.config();

// const app = express();
// const port = process.env.PORT;

// // Middleware
// app.use(
//   cors({
//     origin: process.env.FRONTEND_URL,
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true,
//   })
// );
// app.use(express.json());

// // Routes
// app.use("/api/details", formRoutes);

// // Connect DB and Start Server
// connectDB();
// app.listen(port, () => {
//   console.log(`Server running at port ${port}`);
// });
 





import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import formRoutes from "./routes/formRoute.js";
import "dotenv/config";

import fs from "fs";
import path from "path";

const uploadDir = path.join(process.cwd(), "uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}



dotenv.config();

const app = express();
const port = process.env.PORT;

// Middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// For JSON and FormData (especially file uploads)
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // <-- ADD THIS

// Routes
app.use("/api/details", formRoutes);

// Connect DB and Start Server
connectDB();
app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
