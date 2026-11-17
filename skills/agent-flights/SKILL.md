---
name: agent-flights
description: Find the cheapest flights worldwide (strong on Africa) with the Agent Flights MCP server or REST API, compare a cheapest and a cheapest-sensible option, find the cheapest day in a month or cheap destinations from a city, and give the traveller a booking link. Use when the user asks for flights, airfares, cheapest dates or where to fly on a budget.
license: MIT
compatibility: Remote MCP at https://lowest.flights/mcp (Streamable HTTP, no sign-in) or REST at https://lowest.flights/api/v1. No key needed.
metadata:
  version: "1.2.2"
  homepage: https://lowest.flights
  repository: https://github.com/lomiafrica/agent-flights-mcp
---

# Agent Flights

Cheapest all-in airfares worldwide, strong on African routes (Abidjan, Dakar, Lagos, Accra, Nairobi, Casablanca, Johannesburg). Flights only: no hotels, cars or tours.

## Setup

- MCP: add `https://lowest.flights/mcp` as a remote MCP server (no sign-in).
- REST: `GET https://lowest.flights/api/v1/search?origin=ABJ&destination=CDG&departureDate=2026-12-15&flexDays=3`.
- Optional key: call `register_agent` (or `POST https://lowest.flights/api/v1/agents/register`) once and send `Authorization: Bearer <apiKey>`. Store it as `AGENT_FLIGHTS_API_KEY`.

## Happy path

1. `search_flights` with IATA codes or city names, `departureDate` (YYYY-MM-DD), optional `returnDate`, `flexDays: 3` unless the date is fixed, `currency` (EUR, USD, XOF, NGN, GHS, KES…).
2. Show **cheapest** and **cheapestSensible** with total price, stops, duration and baggage.
3. Warn when `separateTickets` is true (self-transfer, no missed-connection protection) and when `priceKind` is `indicative` (cached fare).
4. Give the traveller the offer's `bookingLink` unchanged (or call `get_booking_link`). Offers expire ~30 minutes after the search.

Flexible dates: `find_cheapest_dates` (origin, destination, month YYYY-MM), then `search_flights` on the cheapest day.
Open destination: `explore_cheap_destinations` (origin, month, optional budget).

## Do not use when

- The user wants to change, cancel or check in for an existing booking: send them to the airline or agency they booked with.
- The user wants hotels, cars, trains or tours.

## Rules

- Quote only tool output; never invent prices or links.
- Agent Flights does not sell tickets: the traveller books and pays on the booking site.

Support: babacar@lowest.flights · Docs: https://lowest.flights/agents · llms.txt: https://lowest.flights/llms.txt
