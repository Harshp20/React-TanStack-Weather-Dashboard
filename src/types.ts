import type { WeatherData } from "./schemas/weather-data-schema";

export type Coords = { lat: number; lng: number };
export type WeatherComponentProps = Readonly<{ coords: Coords }>;
export type OnMapClick = { onMapClick: (coords: Coords) => void };
export type WeatherDataCurrentKey = Exclude<
	keyof WeatherData["current"],
	"rain" | "weather"
>;
