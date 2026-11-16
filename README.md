<p align="center"><img src="assets/logo-400.png" width="120" alt="Agent Flights logo"></p>

# Agent Flights MCP

**Cheapest flights worldwide, strong on Africa, for AI agents.** Agent Flights ([lowest.flights](https://lowest.flights)) is a free remote MCP server and REST API that compares Kiwi.com, Duffel and Aviasales fares, expands nearby airports, combines self-transfer one-ways when cheaper, and returns the **cheapest all-in fare** plus a **cheapest-sensible** alternative (no 20h layovers or risky overnight transfers).

- **Remote MCP (Streamable HTTP):** `https://lowest.flights/mcp`
- **REST API:** `https://lowest.flights/api/v1` ([OpenAPI](https://lowest.flights/api/v1/openapi.json))
- **Official MCP Registry:** [`flights.lowest/agent-flights`](https://registry.modelcontextprotocol.io/?q=flights.lowest%2Fagent-flights)
- **Docs:** [lowest.flights/connect](https://lowest.flights/connect) · [llms.txt](https://lowest.flights/llms.txt)
- **Free:** no key and no payment needed. Optional self-serve API key for higher limits.

## Tools

| Tool | What it does |
| --- | --- |
| `search_flights` | Cheapest fare + cheapest-sensible alternative for a route and dates (one-way/return, passengers, cabin, bags, `flexDays`). |
| `find_cheapest_dates` | Price calendar: cheapest fare per day of a month on one route. |
| `explore_cheap_destinations` | Cheapest destinations from an origin for a month, optionally under a budget. |
| `get_flight_offer` | Full details of one offer: legs, layovers, baggage, fees, warnings. |
| `get_booking_link` | Booking link that redirects to the best bookable partner (Kiwi.com, Aviasales, Trip.com). |
| `list_flight_sources` | Which flight data sources are live right now. |
| `register_agent` | Self-register your agent and get an `af_live_` API key instantly (no email). |

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

## About

Built by [lomi.](https://lomi.africa). Agent Flights earns a partner commission on bookings and never adds a booking fee. This repo holds the public install material; the hosted server runs at lowest.flights.

License: MIT
