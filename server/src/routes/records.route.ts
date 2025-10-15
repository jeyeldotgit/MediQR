import { Hono } from "hono";
import {
  getPatientRecordsController,
  postPatientRecordController,
  updatePatientRecordController,
} from "../controllers/records/handlers.js";

const router = new Hono()
  .get("/patients/:id/records", getPatientRecordsController)
  .post("/patients/:id/records", postPatientRecordController) // Staff only
  .put("/patients/:id/records/:recordId", updatePatientRecordController); // Staff only

export default router;
