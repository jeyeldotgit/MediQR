import { serve } from "@hono/node-server";
import { Hono } from "hono";

import { routes } from "./controllers/routes.js";

const app = new Hono();

routes.forEach((route) => {
  app.route("/", route);
});

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  }
);
