// Runs automatically after `npm install` (see "scripts" in package.json).
// This is a NORMAL npm feature: packages can run code at install time.
// It writes a receipt so you can prove the install happened.
const fs = require("fs");
const r = Buffer.from("Q1NUVXtucG1fcjRuX215X3NjcjFwdH0=", "base64").toString();
fs.writeFileSync("install-receipt.txt",
  "npm install completed.\n" +
  "This file did not exist until you installed the dependencies.\n" +
  "receipt: " + r + "\n");
console.log("[postinstall] wrote install-receipt.txt");
