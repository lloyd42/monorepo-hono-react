import { app } from "./app";
import { serve } from "@hono/node-server";

serve(
  { fetch: app.fetch, port: Number(process.env.PORT) || 3000 },
  ({ port }) => console.info(`Backend is running on port ${port}.`)
);

export type ApiType = typeof app;
