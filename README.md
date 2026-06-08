# React Weather Dashboard

A responsive weather dashboard built with React and TypeScript. Search for a place or use your location, then explore current conditions, hourly and daily forecasts, and an interactive map with OpenWeather overlay layers.

**Live demo:** [hyperlocal-weather-dashboard.vercel.app](https://hyperlocal-weather-dashboard.vercel.app/)

## Sneak Peek

<p align="center">
  <img src="screenshots/desktop.jpeg" width="49%" alt="Desktop view" />
  <img src="screenshots/mobile.png" width="49%" alt="Mobile view" />
</p>

## Features

- **Location search** — Autocomplete powered by [OpenStreetMap Nominatim](https://nominatim.org/)
- **Geolocation** — Loads your current position on first visit (with a sensible fallback)
- **Current weather** — Temperature, conditions, feels-like, humidity, and location name via reverse geocoding
- **Forecasts** — 48-hour hourly scroll and multi-day daily outlook
- **Additional metrics** — Cloud cover, UV index, wind direction, pressure, sunrise, and sunset
- **Interactive map** — Click to change location; switch between precipitation, clouds, pressure, wind, and temperature layers
- **Map styles** — MapTiler basemaps with light/dark theme support and manual style override
- **Dark mode** — System, light, or dark theme with no flash on load
- **Loading states** — Skeleton UI while resolving location and fetching data
- **Validated API responses** — Zod schemas for OpenWeather payloads

## Tech stack

| Area | Libraries |
|------|-----------|
| UI | React 19, Tailwind CSS 4, shadcn/ui, Radix UI, MUI (place search) |
| Data | TanStack Query, Zod |
| Maps | Leaflet, react-leaflet, MapTiler SDK, OpenWeather map tiles |
| Build | Vite 8, TypeScript, React Compiler (Babel) |
| Tooling | ESLint, Biome, Prettier |

## Prerequisites

You need API keys from:

1. **[OpenWeather](https://openweathermap.org/api)** — One Call API 3.0 and map layers
2. **[MapTiler](https://www.maptiler.com/)** — Basemap styles

Both services offer free tiers suitable for development.

## Getting started

### 1. Clone and install

```bash
git clone https://github.com/<your-username>/react-weather-dashboard.git
cd react-weather-dashboard
npm install
```

### 2. Environment variables

Create a `.env` file in the project root:

```env
VITE_OPENWEATHER_API_KEY=your_openweather_api_key
VITE_MAPTILER_API_KEY=your_maptiler_api_key
```

> **Note:** Never commit `.env` or API keys. Vite exposes only variables prefixed with `VITE_`.

### 3. Run the dev server

```bash
npm run dev
```

Open the URL shown in the terminal (Vite runs with `--host` so you can test on other devices on your network).

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Type-check and production build |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |

## Project structure

```
src/
├── api.ts                 # OpenWeather fetch + Zod parsing
├── components/            # UI (map, forecasts, search, skeletons)
├── constants/             # Map layers, legends, defaults
├── hooks/                 # Coords, weather data, geocoding, theme
├── lib/                   # Map styles, theme, toasts
├── schemas/               # Zod weather schemas
└── utils/                 # Formatting, geolocation helpers
```

## How it works

1. On load, `useCoords` resolves coordinates from the browser geolocation API (or a default location if denied).
2. Coordinates drive TanStack Query requests to OpenWeather One Call 3.0.
3. The main map renders MapTiler tiles with an OpenWeather raster overlay; clicking the map updates coordinates.
4. Place search uses Nominatim and updates coordinates when a result is selected.

## License

This project is for learning and portfolio use. Add a license file if you plan to open-source it publicly.
