// import dotenv from "dotenv";
// dotenv.config();
// import express from "express";
// import mongoose from "mongoose";
// import cors from "cors";


// import jobRoutes from "./routes/jobRoutes.js";
// import aiRoutes from "./routes/aiRoutes.js";

// import authRoutes from "./routes/authRoutes.js";

// app.use("/api/auth", authRoutes);
// const app = express();
// app.use(cors());
// app.use(express.json());

// mongoose.connect(process.env.MONGO_URI, {
//   serverSelectionTimeoutMS: 5000
// })
// .then(() => console.log("✅ MongoDB Connected"))
// .catch(err => console.error("❌ Mongo Error:", err.message));

// app.use("/api/jobs", jobRoutes);
// app.use("/api/ai", aiRoutes);

// app.listen(5000, () => console.log("Server running on port 5000"));
// console.log("OPENROUTER KEY:", process.env.OPENROUTER_API_KEY);
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import jobRoutes from "./routes/jobRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import authRoutes from "./routes/authRoutes.js";

// ✅ CREATE APP FIRST
const app = express();

// ✅ MIDDLEWARE
app.use(cors());
app.use(express.json());

// ✅ ROUTES (NOW it's safe)
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/ai", aiRoutes);

// ✅ DATABASE
mongoose.connect(process.env.MONGO_URI, {
  serverSelectionTimeoutMS: 5000
})
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.error("❌ Mongo Error:", err.message));

// ✅ SERVER START
app.listen(5000, () => console.log("Server running on port 5000"));

console.log("OPENROUTER KEY:", process.env.OPENROUTER_API_KEY);