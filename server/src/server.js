import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import "./config/firebase.js";

import userRoutes from "./routes/users.js";
import donationRoutes from "./routes/donations.js";
import noticeRoutes from "./routes/notices.js";
import eventRoutes from "./routes/events.js";
import messageRoutes from "./routes/messages.js";
import settingsRoutes from "./routes/settings.js";
import adminRoutes from "./routes/admin.js";
import { notFound, errorHandler } from "./middleware/error.js";

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL }));
app.use(express.json());

app.get("/api/health", (req, res) => res.json({ ok: true }));

app.use("/api/users", userRoutes);
app.use("/api/donations", donationRoutes);
app.use("/api/notices", noticeRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/settings", settingsRoutes);
app.use("/api/admin", adminRoutes);

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 5000;

connectDB()
  .then(() => app.listen(port, () => console.log(`Server running on port ${port}`)))
  .catch((err) => {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  });
