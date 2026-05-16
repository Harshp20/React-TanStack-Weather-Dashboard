import { useSuspenseQuery } from "@tanstack/react-query";
import { reverseGeocodeFromCoords } from "../api";
import type { Coords } from "../types";

export function useReverseGeocode(coords: Coords) {
	return useSuspenseQuery({
		queryKey: ["reverse-geocode", coords],
		queryFn: () => reverseGeocodeFromCoords(coords),
	});
}
