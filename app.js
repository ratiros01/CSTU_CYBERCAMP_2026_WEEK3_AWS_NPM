const express = require("express");
const morgan  = require("morgan");
const fs = require("fs");
const path = require("path");

const app = express();

const logDir = path.join(__dirname, "logs");
fs.mkdirSync(logDir, { recursive: true });
const accessLog = fs.createWriteStream(path.join(logDir, "access.log"), { flags: "a" });
app.use(morgan("combined", { stream: accessLog }));
app.use(morgan("dev"));

app.use(express.static(path.join(__dirname, "public")));
app.get("/health", (_, res) => res.json({ ok: true, time: new Date().toISOString() }));
app.get("/api/notices", (_, res) => res.json([
  { id: 1, text: "Welcome to CSTU Cyber Camp" },
  { id: 2, text: "Today you learn to deploy a service" }
]));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`campus-notice-board running on :${PORT}`));
