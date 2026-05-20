import type { Coords } from "@/types";

/** Fallback when geolocation is unavailable or denied. */
export const DEFAULT_COORDS: Coords = {
	lat: 34.05709718361611,
	lng: -118.2429595993815,
};
