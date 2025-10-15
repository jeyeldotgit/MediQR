import { Hono } from "hono";

// This is still fucked up : Rethink this one before implementation

const router = new Hono()
  // Define record-related routes here
  .get("/audits/patient/:id");

export default router;
