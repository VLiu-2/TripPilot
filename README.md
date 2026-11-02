# TripPilot

TripPilot is a full-stack, multi-agent travel planning workspace. It turns a destination, date range and personal preferences into an editable itinerary with attractions, accommodation, weather, maps and an estimated budget.

## Highlights

- **Specialized planning agents** collect attraction, weather and hotel context before the final itinerary is assembled.
- **Editable daily schedule** supports removing and reordering attractions without regenerating the entire plan.
- **Portable plan library** stores the latest 12 itineraries locally and supports JSON import and export across browsers.
- **Visual delivery** includes map markers, budget breakdowns, attraction imagery, and PDF or image export.
- **Resilient configuration** keeps API credentials local and exposes health checks for the agent and map services.

## Architecture

```text
Vue 3 workspace
    │
    ▼
FastAPI application
    │
    ├── Attraction Agent ──┐
    ├── Weather Agent ─────┼──► Planner Agent ──► Editable itinerary
    └── Hotel Agent ───────┘
              │
              └── AMap MCP tools
```

## My engineering work

- Designed the local itinerary library and its versioned persistence format.
- Implemented validated JSON migration for portable travel plans.
- Integrated persistence with both generation and subsequent itinerary edits.
- Repaired multi-agent health reporting and standardized the standalone setup workflow.
- Reworked product naming and documentation for a focused portfolio release.

## Stack

Vue 3 · TypeScript · Ant Design Vue · FastAPI · HelloAgents · AMap MCP

## Run locally

1. Run `setup.ps1` to install the backend and frontend dependencies.
2. Add the required model and AMap credentials to `backend/.env` and `frontend/.env.local`.
3. Start the services with `./start.ps1 backend` and `./start.ps1 frontend`.

Environment templates contain placeholders only. Real `.env` files are excluded from Git.

## License

Released under CC BY-NC-SA 4.0. Third-party attribution and modification notes are recorded in `NOTICE.md`.
