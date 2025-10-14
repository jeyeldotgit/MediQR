import authRoutes from "./auth/routes.js";
import patientsRoutes from "./patients/routes.js";
import QrCodeRoutes from "./qr/routes.js";
import recordsRoutes from "./records/routes.js";

export const routes = [
  authRoutes,
  patientsRoutes,
  QrCodeRoutes,
  recordsRoutes,
] as const;

export type AppRoutes = (typeof routes)[number];
