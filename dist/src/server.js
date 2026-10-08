"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get("/health", (_req, res) => {
    res.json({ status: "ok" });
});
app.use((req, res) => {
    res.status(404).json({ error: `Cannot ${req.method} ${req.path}` });
});
app.use((err, _req, res, _next) => {
    const status = err.status ?? err.statusCode ?? 500;
    const message = status >= 500 ? "Internal server error" : (err.message ?? "Request failed");
    if (status >= 500) {
        console.error(err);
    }
    res.status(status).json({ error: message });
});
exports.default = app;
//# sourceMappingURL=server.js.map