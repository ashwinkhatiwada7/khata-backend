"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv");
const db_1 = require("../db");
const server_1 = __importDefault(require("./server"));
const port = Number(process.env.PORT) || 3002;
const server = server_1.default.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
});
const shutdown = (signal) => {
    console.log(`${signal} received, shutting down`);
    server.close(() => {
        db_1.pool.end(() => process.exit(0));
    });
    setTimeout(() => process.exit(1), 10_000).unref();
};
process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));
//# sourceMappingURL=index.js.map