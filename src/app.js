import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";

import authRouter from "./routers/auth.router.js";
import imageRouter from "./routers/image.router.js";
import commentRouter from "./routers/comment.router.js";
import userRouter from "./routers/user.router.js";

import errorHandler from "./common/middlewares/errorHandler.js";

const app = express();

// ================== Middlewares chung ==================

// CORS cho FE local
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:3000"],
    credentials: true,
  })
);

// (tuỳ) cho preflight tất cả route
app.options("*", cors());

// Bảo mật headers
app.use(helmet());

// Logging HTTP request
app.use(morgan("dev"));

// Parse body JSON + form-urlencoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static file ảnh upload
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Cho phép ảnh dưới /images được nhúng cross-origin
app.use("/images", (req, res, next) => {
  res.removeHeader("Cross-Origin-Resource-Policy");
  next();
});

app.use(
  "/images",
  express.static(path.join(__dirname, "..", "public", "images"))
);

// ================== Health check ==================
app.get("/health", (req, res) => {
  res.json({ status: "ok", message: "Server is running" });
});

// ================== Routes ==================
app.use("/auth", authRouter);
app.use("/images", imageRouter);
+ app.use("/images", commentRouter);
app.use("/users", userRouter);

// ================== Error handler ==================
app.use(errorHandler);

export default app;
