import { Hono } from "hono";

// Import necessary controllers and middlewares here
import { getPatientController, updatePatientController } from "./handlers.js";

// Auth Middleware is require here

const router = new Hono()
  // Define patient-related routes here
  .get("/patients/:id", getPatientController)
  .put("/patients/:id", updatePatientController);

export default router;
