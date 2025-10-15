import authRoutes from "./auth.route.js";
import patientsRoutes from "./patients.route.js";
import QrCodeRoutes from "./qrcode.route.js";
import recordsRoutes from "./records.route.js";

export const routes = [
  authRoutes,
  patientsRoutes,
  QrCodeRoutes,
  recordsRoutes,
] as const;

export type AppRoutes = (typeof routes)[number];
