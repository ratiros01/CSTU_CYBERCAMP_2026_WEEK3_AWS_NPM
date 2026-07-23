const express = require("express");
const morgan  = require("morgan");
const fs = require("fs");
const path = require("path");

const app = express();
const dec = (b) => Buffer.from(b, "base64").toString();   // reveal at runtime only

// --- web access log, Apache "combined" format (same shape as the labs') ---
const logDir = path.join(__dirname, "logs");
fs.mkdirSync(logDir, { recursive: true });
const accessLog = fs.createWriteStream(path.join(logDir, "access.log"), { flags: "a" });
app.use(morgan("combined", { stream: accessLog }));
app.use(morgan("dev"));

// --- the app ---
app.use(express.static(path.join(__dirname, "public")));
app.get("/api/notices", (_, res) => res.json([
  { id: 1, text: "Welcome to CSTU Cyber Camp" },
  { id: 2, text: "Today you learn to deploy a service" }
]));

// D4: only reachable while the service is actually running
app.get("/health", (_, res) => res.json({
  ok: true,
  time: new Date().toISOString(),
  service: dec("Q1NUVXtkM3BsMHkzZF80bmRfbDF2M30=")
}));

// D5: replies with nothing, but writes an audit line into the log
app.get("/audit", (_, res) => {
  accessLog.write(`[audit] ${new Date().toISOString()} maintenance check ok ` +
                  `ref=${dec("Q1NUVXtsMGdzX3IzbTNtYjNyX3kwdX0=")}\n`);
  res.status(204).end();
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`campus-notice-board running on :${PORT}`));
