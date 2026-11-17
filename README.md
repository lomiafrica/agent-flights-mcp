<p align="center"><img src="assets/logo-400.png" width="120" alt="Agent Flights logo"></p>

# Agent Flights MCP

<p align="center">
  <a href="https://cursor.com/en/install-mcp?name=agent-flights&config=eyJ1cmwiOiAiaHR0cHM6Ly9sb3dlc3QuZmxpZ2h0cy9tY3AifQ=="><img src="https://cursor.com/deeplink/mcp-install-dark.svg" alt="Add to Cursor" height="32"></a>
  <a href="https://insiders.vscode.dev/redirect/mcp/install?name=agent-flights&config=%7B%22type%22%3A%20%22http%22%2C%20%22url%22%3A%20%22https%3A//lowest.flights/mcp%22%7D"><img src="https://img.shields.io/badge/VS_Code-Add_MCP-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white" alt="Add to VS Code" height="32"></a>
  <a href="https://insiders.vscode.dev/redirect/mcp/install?name=agent-flights&config=%7B%22type%22%3A%20%22http%22%2C%20%22url%22%3A%20%22https%3A//lowest.flights/mcp%22%7D&quality=insiders"><img src="https://img.shields.io/badge/VS_Code_Insiders-Add_MCP-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white" alt="Add to VS Code Insiders" height="32"></a>
  <a href="https://lmstudio.ai/install-mcp?name=agent-flights&config=eyJ1cmwiOiAiaHR0cHM6Ly9sb3dlc3QuZmxpZ2h0cy9tY3AifQ=="><img src="https://img.shields.io/badge/LM_Studio-Add_MCP-4f46e5?style=flat-square" alt="Add to LM Studio" height="32"></a>
</p>

**Cheapest flights worldwide, strong on Africa, for AI agents.** Agent Flights ([lowest.flights](https://lowest.flights)) is a free remote MCP server and REST API that compares live and cached fares from several sources and booking sites, expands nearby airports, combines self-transfer one-ways when cheaper, and returns the **cheapest all-in fare** plus a **cheapest-sensible** alternative (no 20h layovers or risky overnight transfers).

- **Remote MCP (Streamable HTTP):** `https://lowest.flights/mcp`
- **REST API:** `https://lowest.flights/api/v1` ([OpenAPI](https://lowest.flights/api/v1/openapi.json))
- **Official MCP Registry:** [`flights.lowest/agent-flights`](https://registry.modelcontextprotocol.io/?q=flights.lowest%2Fagent-flights)
- **Docs:** [lowest.flights/agents](https://lowest.flights/agents) · [agents.md](https://lowest.flights/agents.md) · [llms.txt](https://lowest.flights/llms.txt) · [Agent skill](https://lowest.flights/skill.md)
- **Free:** no key and no payment needed. Optional self-serve API key for higher limits.

## Tools

| Tool | What it does |
| --- | --- |
| `search_flights` | Cheapest fare + cheapest-sensible alternative for a route and dates (one-way/return, passengers, cabin, bags, `flexDays`). |
| `find_cheapest_dates` | Price calendar: cheapest fare per day of a month on one route. |
| `explore_cheap_destinations` | Cheapest destinations from an origin for a month, optionally under a budget. |
| `get_flight_offer` | Full details of one offer: legs, layovers, baggage, fees, warnings. |
| `get_booking_link` | Booking link that redirects to the best bookable booking site. |
| `list_flight_sources` | Which flight data sources are live right now. |
| `register_agent` | Self-register your agent and get an `af_live_` API key instantly (no email). |
| `unlock_mcp` | Returns a notice that MCP is free; creates no checkout. |

## Install

### Any client that supports remote MCP (Claude.ai, ChatGPT connectors, Cursor, VS Code, Windsurf…)

Use the URL `https://lowest.flights/mcp`.

### Cursor (`~/.cursor/mcp.json`)

```json
{ "mcpServers": { "agent-flights": { "url": "https://lowest.flights/mcp" } } }
```

### VS Code (`.vscode/mcp.json`)

```json
{ "servers": { "agent-flights": { "type": "http", "url": "https://lowest.flights/mcp" } } }
```

### Claude Code

```bash
claude mcp add --transport http agent-flights https://lowest.flights/mcp
```

### Claude (claude.ai, Desktop, mobile)

Settings → Connectors → Add custom connector → `https://lowest.flights/mcp` (no sign-in).

### ChatGPT

Settings → Apps → Advanced settings → Developer mode → Create app → `https://lowest.flights/mcp`, Authentication: none.

### Grok and Grok Bot

- grok.com: [Connectors](https://grok.com/connectors) → New Connector → Custom → `https://lowest.flights/mcp`.
- Grok CLI: `grok mcp add --transport http agent-flights https://lowest.flights/mcp`
- Grok Bot: ask “Add a custom MCP server called agent-flights at https://lowest.flights/mcp” and approve the card.

### Codex CLI (`~/.codex/config.toml`)

```toml
[mcp_servers.agent_flights]
url = "https://lowest.flights/mcp"
```

### Gemini CLI

```bash
gemini extensions install https://github.com/lomiafrica/agent-flights-mcp
```

### Plugin (Cursor, Claude Code, Codex)

This repo is also an agent plugin: `.cursor-plugin/plugin.json`, `.claude-plugin/plugin.json` (+ `marketplace.json`), `.codex-plugin/plugin.json`, root `plugin.json`, `mcp.json` and the `skills/agent-flights` skill. Claude Code:

```bash
/plugin marketplace add lomiafrica/agent-flights-mcp
/plugin install agent-flights@agent-flights
```

### Framework quickstarts

Vercel AI SDK, OpenAI Agents SDK, Claude Agent SDK, LangChain, CrewAI, Google ADK and the xAI API: [lowest.flights/agents#frameworks](https://lowest.flights/agents#frameworks).

### Claude Desktop, Cline, Windsurf, or any stdio-only client

```json
{
  "mcpServers": {
    "agent-flights": {
      "command": "npx",
      "args": ["-y", "mcp-remote", "https://lowest.flights/mcp"]
    }
  }
}
```

Or use the tiny stdio bridge in this repo (`bin/agent-flights-mcp.js`, wraps `mcp-remote`):

```json
{
  "mcpServers": {
    "agent-flights": {
      "command": "npx",
      "args": ["-y", "github:lomiafrica/agent-flights-mcp"],
      "env": { "AGENT_FLIGHTS_API_KEY": "optional af_live_ key" }
    }
  }
}
```

## Optional API key

Call the `register_agent` tool, or:

```bash
curl -X POST https://lowest.flights/api/v1/agents/register \
  -H 'content-type: application/json' -d '{"name":"My agent","client":"claude"}'
```

Send it as `Authorization: Bearer <apiKey>`. Keys raise limits and attribute booking clicks to your agent.

## Example

> "Find me the cheapest flight from Abidjan to Paris around 18 December, back 5 January."

```json
{ "origin": "ABJ", "destination": "CDG", "departureDate": "2026-12-18", "returnDate": "2027-01-05", "flexDays": 3, "currency": "XOF" }
```

## Privacy Policy

Agent Flights receives only the tool arguments your agent sends (route, dates, passengers, cabin, currency), plus IP address and client name for rate limits. It collects no traveller names, IDs, payment data or conversation history. Search caches expire within about 24 hours; usage counters within 3 days. Full policy: https://lowest.flights/privacy · Terms: https://lowest.flights/terms

## Support

Email babacar@lowest.flights or open an issue in this repository.

## About

Built by [lomi.](https://lomi.africa) (LOMI. INC). Agent Flights earns a partner commission on bookings and never adds a booking fee. This repo holds the public install material; the hosted server runs at lowest.flights.

License: MIT
