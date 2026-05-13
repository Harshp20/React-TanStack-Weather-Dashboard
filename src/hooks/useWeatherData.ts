import { useSuspenseQuery } from "@tanstack/react-query";
import { getWeatherData } from "../api";
import type { Coords } from "../types";

export function useWeatherData(coords: Coords) {
	return useSuspenseQuery({
		queryKey: ["weather-data", coords],
		queryFn: () => getWeatherData(coords),
	});
}
