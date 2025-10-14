import authRoutes from "./auth/routes.js";

export const routes = [authRoutes] as const;

export type AppRoutes = (typeof routes)[number];
