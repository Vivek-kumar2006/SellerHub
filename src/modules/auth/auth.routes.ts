import { Router } from "express";
import { RegisterUserSchema, LoginUserSchema } from "./auth.schema.js";
import {
  loginhandler,
  registerhandler,
  refreshTokenhandler,
  logouthandler,
} from "./auth.controller.js";
import { validate } from "../../middlewares/validate.middleware.js";

const router = Router();

// Registration & Authentication
router.post("/register", validate({ body: RegisterUserSchema }), registerhandler);
router.post("/login", validate({ body: LoginUserSchema }), loginhandler);

// Token Lifecycle & Session Management
router.post("/refresh", refreshTokenhandler);
router.post("/logout", logouthandler);

export default router;