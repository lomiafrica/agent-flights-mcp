# Installing Agent Flights MCP (for AI agents such as Cline)

Agent Flights is a hosted remote MCP server. Nothing needs to be built or cloned, and no API key is required.

## Option A: remote (Streamable HTTP), preferred when the client supports it

Add this server to the MCP settings file:

```json
{
  "mcpServers": {
    "agent-flights": {
      "type": "streamableHttp",
      "url": "https://lowest.flights/mcp"
    }
  }
}
```

## Option B: stdio (works in every client)

Requires Node.js 18+.

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

## Verify

Call `list_flight_sources` (no input). Then try `search_flights` with
`{"origin":"ABJ","destination":"CDG","departureDate":"<a date in the next few months, YYYY-MM-DD>","flexDays":3}`.

## Optional API key

Keys are optional. To get one, call the `register_agent` tool with `{"name":"Cline","client":"cline"}` and add
`"headers": {"Authorization": "Bearer <apiKey>"}` (Option A) or
`"--header", "Authorization:Bearer <apiKey>"` to the args (Option B).
