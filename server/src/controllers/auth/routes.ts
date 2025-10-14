import { Hono } from "hono";

// Import necessary controllers and middlewares here
import { postLoginController, postRegisterController } from "./index.js";

const router = new Hono()
  .post("/login", postLoginController)
  .post("/register", postRegisterController);

export default router;
