import "dotenv";
import { pool } from "../db";
import app from "./server";
import { config } from "dotenv";
const port = Number(process.env.PORT) || 3002;
config();
const server = app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});

const shutdown = (signal: string) => {
  console.log(`${signal} received, shutting down`);

  server.close(() => {
    pool.end(() => process.exit(0));
  });

  setTimeout(() => process.exit(1), 10_000).unref();
};

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));
