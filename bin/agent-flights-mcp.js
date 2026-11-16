#!/usr/bin/env node
// Stdio bridge to the remote Agent Flights MCP server (Streamable HTTP).
// Optional: set AGENT_FLIGHTS_API_KEY to send it as a Bearer token.
import { spawn } from "node:child_process";
import { createRequire } from "node:module";
import path from "node:path";

const require = createRequire(import.meta.url);
const url = process.env.AGENT_FLIGHTS_MCP_URL || "https://lowest.flights/mcp";
const args = [url, "--transport", "http-only"];
const key = process.env.AGENT_FLIGHTS_API_KEY;
if (key) args.push("--header", `Authorization:Bearer ${key}`);

let cli = null;
try {
  const pkg = require.resolve("mcp-remote/package.json");
  cli = path.join(path.dirname(pkg), "dist", "proxy.js");
} catch {}
const child = cli
  ? spawn(process.execPath, [cli, ...args], { stdio: "inherit" })
  : spawn("npx", ["-y", "mcp-remote", ...args], { stdio: "inherit", shell: process.platform === "win32" });
child.on("exit", (code) => process.exit(code ?? 0));
for (const s of ["SIGINT", "SIGTERM"]) process.on(s, () => child.kill(s));
