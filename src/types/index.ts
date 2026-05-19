import type { mapLayers } from "@/constants/mapLayerOptions";
import type { WeatherData } from "@/schemas/weather-data-schema";

export type MapLayerKey = (typeof mapLayers)[number]["id"];

export type MapLayerSelectorProps = Readonly<{
	mapLayer: MapLayerKey;
	setMapLayer: (mapLayer: MapLayerKey) => void;
}>;

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
