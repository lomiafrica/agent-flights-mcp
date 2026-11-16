# Agent Flights

Use `search_flights` for a route and dates (IATA codes or city names, ISO dates; pass `flexDays=3` unless the date is fixed). Always show `cheapest` and `cheapestSensible`. Warn when `separateTickets` is true and when `priceKind` is `indicative`. Send travellers to `bookingLink`. Use `find_cheapest_dates` for the cheapest day in a month and `explore_cheap_destinations` when the destination is open. Offers expire about 30 minutes after a search.
