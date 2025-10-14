import { Hono } from "hono";
import { getQrScanController, postQrGenerateController } from "./handlers.js";

const router = new Hono()
  // Define patient-related routes here
  .post("/qr/generate", postQrGenerateController)
  .get("/qr/:id/scan", getQrScanController);

export default router;
