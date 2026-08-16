import express, { Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./modules/auth/auth.routes.js";
import { ApiError } from "./utils/ApiError.js";

const app = express();

// CORS configuration supporting HTTP-only credentials
app.use(
  cors({
    origin: (origin, callback) => {
      // Reflects incoming origin back to allow credentials (e.g., Insomnia, React dev server)
      callback(null, true);
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

// Silence Chrome DevTools internal discovery ping
app.get("/.well-known/appspecific/com.chrome.devtools.json", (req: Request, res: Response) => {
  res.status(204).end();
});

// Mount Auth Module
app.use("/api/v1/auth", authRoutes);

// Global Error Handling Middleware (Must be declared after routes)
//app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

export default app;