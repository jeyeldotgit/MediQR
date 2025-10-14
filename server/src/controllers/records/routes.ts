import { Hono } from "hono";
import {
  getPatientRecordsController,
  postPatientRecordController,
} from "./handlers.js";

const router = new Hono()
  .get("/patients/:id/records", getPatientRecordsController)
  .post("/patients/:id/records", postPatientRecordController); // Staff only

export default router;
