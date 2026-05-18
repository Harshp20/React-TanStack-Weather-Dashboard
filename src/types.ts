import type { WeatherData } from "./schemas/weather-data-schema";

export type Coords = { lat: number; lng: number };

/** Optional Tailwind classes — use `className` for editor autocomplete. */
export type WithClassName = Readonly<{
	className?: string;
}>;

export type WeatherComponentProps = Readonly<{
	coords: Coords;
}> &
	WithClassName;
export type WeatherDataCurrentKey = Exclude<
	keyof WeatherData["current"],
	"rain" | "weather"
>;
