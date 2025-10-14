import type { Context } from "hono";

export const auditController = async (c: Context) => {
  return c.json({ message: "Audit endpoint - to be implemented" });
};
